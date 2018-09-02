from django import template
from blog.models import Article

register = template.Library()


@register.inclusion_tag(filename='blog/inclusion_tag/article_guide.html', name='article_guide')
def article_guide(title='最新文章', type='newest'):
    return article_list_guide(title, type, 1)


@register.inclusion_tag(filename='blog/inclusion_tag/article_list_guide.html', name='article_list_guide')
def article_list_guide(title='最新文章', type='newest', num=3):
    if type == 'newest':
        return {'articles': Article.objects.order_by('-creationTime')[0:num], 'title': title}
    elif type == 'hot':
        return {'articles': Article.objects.order_by('-viewTime', '-loveTime')[0:num], 'title': title}
    elif type == 'recommend':
        return {'articles': Article.objects.filter(recommend=True).order_by('-creationTime')[0:num], 'title': title}
    elif type == 'high_quality':
        return {'articles': Article.objects.filter(highQuality=True).order_by('-viewTime', '-loveTime')[0:num], 'title': title}
    else:
        return {'articles': Article.objects.order_by('-creationTime')[0:num], 'title': title}