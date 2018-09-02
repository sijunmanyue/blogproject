from django import template
from blog.models import Article

register = template.Library()


@register.inclusion_tag(filename='blog/inclusion_tag/newest_article.html', name='newest_article')
def newest_article():
    articles = Article.objects.order_by('-creationTime')
    article = articles[0] if articles.count() else None
    return {'article': article}


@register.inclusion_tag(filename='blog/inclusion_tag/article_guide.html', name='article_guide')
def article_guide(title = '最新文章', type = 'newest'):
    if type == 'newest':
        return {'article': Article.objects.order_by('-creationTime').first(), 'title': title}
    elif type == 'hot':
        return {'article': Article.objects.order_by('-viewTime').first(), 'title': title}
    elif type == 'recommend':
        return {'article': Article.objects.filter(recommend=True).first(), 'title': title}
    elif type == 'high_quality':
        return {'article': Article.objects.filter(highQuality=True).first(), 'title': title}
    else:
        return {'article': Article.objects.first(), 'title': title}