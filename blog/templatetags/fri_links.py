from django import template
from blog.models import FriLink

register = template.Library()


@register.inclusion_tag(filename='blog/inclusion_tag/fri_links.html', name='fri_links')
def fri_links(title, num):
    links = FriLink.objects.filter(isShow=True)[:num+1]
    return {'links': links, 'title': title}