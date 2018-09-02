import re

import jieba
import jieba.analyse
from django.core.cache import cache
from django.core.paginator import Paginator
from django.db.models import Q
from django.shortcuts import render
from django.views.decorators.http import require_GET

from blog.models import Article
from blog.utils.MyPaginator import MyPaginator

page_size = 10
page_width = 5


# 文章列表查询
@require_GET
def lists(request, page):
    key = request.GET.get('key')
    page = page or 1
    if key:
        return get_articles_by_key(request, page)
    else:
        articles = Article.objects.only('id', 'title', 'summary', 'picture', 'creationTime').all().order_by('-viewTime')
        p = MyPaginator(articles, page_size)
        articles = p.get_my_page(page, page_width)
        return render(request, 'blog/article/index.html', {'articles': articles})


# Article falls
@require_GET
def falls(request):
    page_num = request.GET.get('page', 1)
    page_num = page_num if page_num > 0 else 1
    articles = Article.objects.order_by('-creationTime')
    p = Paginator(articles)
    page = p.get_page(page_num)
    return render(request, 'blog/includes/falls.html', {'articles': page})


# 通过文章id获取文章详情
def get_article_by_id(request, article_id):

    article = Article.objects.filter(id=article_id).first()
    if article:

        comments = article.comment_set.all()
        comment_size = comments.count()
        reply_size = 0
        for comment in comments:
            reply_size += comment.replies.all().count()

        key = 'lock:%s:%s' % ('article', article_id)
        with cache.lock(key):
            article.viewTime += 1
            if article.viewTime > 100:
                article.recommend = True
            article.save(update_fields=['viewTime', 'recommend'])

    else:
        return None

    context = {'article': article,
               'total_num': comment_size + reply_size, 'inclusion_tag': article.tags.all()}

    return render(request, 'blog/article/detail.html', context)


# 根据标签编号查询文章
def get_articles_by_tag(request, tag, page=1):
    articles = Article.objects.filter(tags__code=tag).order_by('-viewTime')
    p = MyPaginator(articles, page_size)
    articles = p.get_my_page(page, page_width)
    return render(request, 'blog/article/index.html', {'articles': articles, 'tag': tag})


# 根据类别查询文章
def get_articles_by_category(request, cate, page=1):
    articles = Article.objects.filter(category__code=cate).order_by('-viewTime')
    p = MyPaginator(articles, page_size)
    articles = p.get_my_page(page, page_width)
    return render(request, 'blog/article/index.html', {'articles': articles, 'cate': cate})


# 根据关键词查询并分页
def get_articles_by_key(request, page):

    key = request.GET['key']

    seg_list = jieba.lcut_for_search(key, HMM=False)
    seg_list = [x for x in set(seg_list) if len(x) > 1 and re.match('[\u4e00-\u9fa5A-Za-z0-9]', x)]
    seg_list = seg_list or [key]

    query = None
    select_params_list = []
    select_dict = dict()
    order_by_title_list = []
    order_by_summary_list = []

    def contains(seg):
        return Q(title__contains=seg) | Q(summary__contains=seg)

    def title_alias(seg):
        return 'is_title_like_%s' % seg

    def summary_alias(seg):
        return 'is_summary_like_%' % seg

    def title_like(seg):
        return 'blog_article.title like %s'

    def summary_like(seg):
        return 'blog_article.summary like %s'

    #select_dict = [{title_alias(seg): title_like(seg), summary_alias(seg)} for seg in seg_list]
    for seg in seg_list:

        query = query | contains(seg) if query else contains(seg)

        title_alias = f'is_title_like_{seg}'
        summary_alias = f'is_summary_like_{seg}'
        select_dict[title_alias] = 'blog_article.title like %s'
        select_dict[summary_alias] = 'blog_article.summary like %s'
        select_params_list.append('%' + seg + '%')
        select_params_list.append('%' + seg + '%')
        order_by_title_list.append('-' + title_alias)
        order_by_summary_list.append('-' + summary_alias)

    articles = Article.objects.filter(query)\
        .only('id', 'title', 'summary', 'creationTime')\
        .extra(select=select_dict, select_params=select_params_list,
               order_by=order_by_title_list + order_by_summary_list).distinct()

    p = MyPaginator(articles, page_size)
    articles = p.get_my_page(page, page_width)

    return render(request, 'blog/article/index.html',
                  {'articles': articles, 'words': seg_list, 'key': key})
