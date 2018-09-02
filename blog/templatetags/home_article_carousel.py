from django import template
from blog.models import Article

register = template.Library()


@register.inclusion_tag(filename='blog/inclusion_tag/home_article_carousel.html', name='home_article_carousel')
def home_article_carousel(num=5):
    articles = Article.objects.filter(recommend=True).only('title', 'id', 'picture')[0:num]
    return {'articles': articles}