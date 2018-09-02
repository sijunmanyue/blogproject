from blog.models import Comment, Reply, Article
from django.core.paginator import Paginator
from django.shortcuts import render
from django.http import HttpResponse
from django.core.cache import cache
from django.template import loader
import json


# 前台动态加载评论
def load_comments(request):

    if not request.method.upper() == 'GET':
        return HttpResponse(json.dumps({'status': False, 'message': 'unsupported method %s.' % (request.method, )}),
                            content_type='application/json')

    if 'article_id' not in request.GET or not request.GET['article_id']:
        return HttpResponse(json.dumps({'status':False, 'message':'article_id is null.'}), content_type='application/json')

    article_id = request.GET['article_id']
    article = Article.objects.filter(id=article_id).first()
    if article is None:
        return HttpResponse(json.dumps({'status': False, 'message': 'article %s not exists.' % (article_id, )}),
                            content_type='application/json')

    if 'filter_ids' in request.GET and request.GET['filter_ids']:
        filter_ids = [int(id) for id in ','.split(request.GET['filter_ids'])]
    else:
        filter_ids = []

    all_comments = article.comment_set.exclude(id__in = filter_ids).all()
    if all_comments.count() == 0:
        return HttpResponse(json.dumps({'status': False, 'content': 'no data found.'}), content_type='application/json')

    count = 0 if 'count' not in request.GET or not request.GET['count'] else request.GET['count']
    count = int(count)
    page_size = 10 if 'page_size' not in request.GET or not request.GET['page_size'] else request.GET['page_size']
    page_size = int(page_size)

    comments = all_comments[count:(count + page_size)]
    has_more = len(all_comments) - (count + page_size) > 0

    comment_html_list = []
    for comment in comments:
        comment_dict = {'comment_dict':{'comment':comment, 'replies':comment.replies.all()}}
        comment_html = loader.render_to_string('blog/includes/comment_item.html', comment_dict, request)
        comment_html_list.append(comment_html)

    return HttpResponse(json.dumps({'status':True, 'content': ''.join(comment_html_list), 'length': len(comments), 'has_more': has_more}), content_type='application/json')


# 踩评论
def comment_dislike(request):

    if not request.method.upper() == 'GET':
        return HttpResponse(json.dumps({'status': False, 'message': 'unsupported method %s.' % (request.method, )}),
                            content_type='application/json')

    if 'comment_id' not in request.GET or not request.GET['comment_id']:
        return HttpResponse(json.dumps({'status':False, 'message':'comment_id is null.'}), content_type='application/json')

    comment_id = request.GET['comment_id']

    comment = Comment.objects.filter(id=int(comment_id)).first()

    if comment is None:
        return HttpResponse(json.dumps({'status': False, 'message': 'reply %s not exists.' % (id,)}),
                            content_type='application/json')

    key = 'lock:%s:%s' % ('comment', comment_id)
    with cache.lock(key):
        comment.dislike = comment.dislike + 1
        comment.save()

    return HttpResponse(json.dumps({'status': True, 'message': 'success.', 'count': comment.dislike}),
                        content_type='application/json')


# 踩回复
def reply_dislike(request):

    if not request.method.upper() == 'GET':
        return HttpResponse(json.dumps({'status': False, 'message': 'unsupported method %s.' % (request.method, )}),
                            content_type='application/json')

    if 'reply_id' not in request.GET or not request.GET['reply_id']:
        return HttpResponse(json.dumps({'status':False, 'message':'reply_id is null.'}), content_type='application/json')

    reply_id = request.GET['reply_id']

    reply = Reply.objects.filter(id=int(reply_id)).first()

    if reply is None:
        return HttpResponse(json.dumps({'status': False, 'message': 'reply %s not exists.' % (id,)}),
                            content_type='application/json')
    key = 'lock:%s:%s' % ('reply', reply_id)
    with cache.lock(key):
        reply.dislike = reply.dislike + 1
        reply.save()

    return HttpResponse(json.dumps({'status': True, 'message': 'success.', 'count': reply.dislike}),
                        content_type='application/json')


# 赞评论
def comment_appreciate(request):
    if not request.method.upper() == 'GET':
        return HttpResponse(json.dumps({'status': False, 'message': 'unsupported method %s.' % (request.method,)}),
                            content_type='application/json')

    if 'comment_id' not in request.GET or not request.GET['comment_id']:
        return HttpResponse(json.dumps({'status': False, 'message': 'comment_id is null.'}),
                            content_type='application/json')

    comment_id = request.GET['comment_id']

    comment = Comment.objects.filter(id=int(comment_id)).first()

    if comment is None:
        return HttpResponse(json.dumps({'status': False, 'message': 'reply %s not exists.' % (id,)}),
                            content_type='application/json')

    key = 'lock:%s:%s' % ('comment', comment_id)
    with cache.lock(key):
        comment.appreciate = comment.appreciate + 1
        comment.save()

    return HttpResponse(json.dumps({'status': True, 'message': 'success.', 'count': comment.appreciate}),
                        content_type='application/json')


# 赞回复
def reply_appreciate(request):
    if not request.method.upper() == 'GET':
        return HttpResponse(json.dumps({'status': False, 'message': 'unsupported method %s.' % (request.method,)}),
                            content_type='application/json')

    if 'reply_id' not in request.GET or not request.GET['reply_id']:
        return HttpResponse(json.dumps({'status': False, 'message': 'reply_id is null.'}),
                            content_type='application/json')

    reply_id = request.GET['reply_id']

    reply = Reply.objects.filter(id=int(reply_id)).first()

    if reply is None:
        return HttpResponse(json.dumps({'status': False, 'message': 'reply %s not exists.' % (id,)}),
                            content_type='application/json')
    key = 'lock:%s:%s' % ('reply', reply_id)
    with cache.lock(key):
        reply.appreciate = reply.appreciate + 1
        reply.save()

    return HttpResponse(json.dumps({'status': True, 'message': 'success.', 'count': reply.appreciate}),
                        content_type='application/json')


def reply(request):

    if not request.method.upper() == 'POST':
        return HttpResponse(json.dumps({'status': False, 'message': 'unsupported method %s.' % (request.method, )}),
                            content_type='application/json')

    if 'comment_id' not in request.POST or not request.POST['comment_id']:
        return HttpResponse(json.dumps({'status': False, 'message': 'comment_id is null.'}),
                            content_type='application/json')

    if 'content' not in request.POST or not request.POST['content']:
        return HttpResponse(json.dumps({'status':False, 'message':'content is null.'}), content_type='application/json')

    if 'article_id' not in request.POST or not request.POST['article_id']:
        return HttpResponse(json.dumps({'status':False, 'message':'article_id is null.'}), content_type='application/json')

    if request.user.is_anonymous:
        return HttpResponse(json.dumps({'status': False, 'message': 'account not login.'}),
                            content_type='application/json')

    comment_id = request.POST['comment_id']
    article_id = request.POST['article_id']
    content = request.POST['content']

    comment = Comment.objects.filter(id=comment_id).first()
    if comment is None:
        return HttpResponse(json.dumps({'status': False, 'message': 'comment %s not exists.' % (comment_id,)}),
                            content_type='application/json')

    reply_to = None
    if 'reply_to' in request.POST and request.POST['reply_to']:
        reply_to = Reply.objects.filter(id=request.POST['reply_to']).first()

        if reply_to is None:
            return HttpResponse(json.dumps({'status': False, 'message': 'reply_to %s not exists.' % (request.POST['reply_to'], )}),
                                content_type='application/json')

    article = Article.objects.filter(id=article_id).first()
    if article is None:
        return HttpResponse(json.dumps({'status': False, 'message': 'article %s not exists.' % (article_id,)}),
                            content_type='application/json')

    reply_obj = Reply()
    reply_obj.article = article
    reply_obj.user = request.user
    reply_obj.comment = comment

    if reply_to is not None:
        reply_obj.reply_to = reply_to

    reply_obj.content = content

    reply_obj.save()

    content = loader.render_to_string('blog/includes/reply_item.html', {'reply': reply_obj}, request)

    return HttpResponse(json.dumps({'status': True, 'message': 'success.', 'content': content}), content_type='application/json')


def comment(request):

    if not request.method.upper() == 'POST':
        return HttpResponse(json.dumps({'status': False, 'message': 'unsupported method %s.' % (request.method, )}),
                            content_type='application/json')

    if 'content' not in request.POST or not request.POST['content']:
        return HttpResponse(json.dumps({'status':False, 'message':'content is null.'}), content_type='application/json')

    if 'article_id' not in request.POST or not request.POST['article_id']:
        return HttpResponse(json.dumps({'status':False, 'message':'article_id is null.'}), content_type='application/json')

    if request.user.is_anonymous:
        return HttpResponse(json.dumps({'status': False, 'message': 'account not login.'}),
                            content_type='application/json')

    article_id = request.POST['article_id']
    content = request.POST['content']

    article = Article.objects.filter(id=article_id).first()
    if article is None:
        return HttpResponse(json.dumps({'status': False, 'message': 'article %s not exists.' % (article_id,)}),
                            content_type='application/json')

    comment = Comment()
    comment.article = article
    comment.user = request.user
    comment.content = content
    comment.save()

    content = loader.render_to_string('blog/includes/comment_item.html', {'comment_dict': {'comment':comment, 'replies':[]}}, request)

    return HttpResponse(json.dumps({'status': True, 'message': 'success.', 'content': content}), content_type='application/json')

