from django import template
from blog.models import AboutMe,Article

register = template.Library()


@register.inclusion_tag(filename='blog/inclusion_tag/about_me.html', name='about_me')
def about_me():
    about = AboutMe.objects.get()
    count = Article.objects.all().count()
    return {'about': about, 'count': count}