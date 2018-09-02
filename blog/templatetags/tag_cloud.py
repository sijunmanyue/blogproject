from django import template

from blog.models import Tag

register = template.Library()


@register.inclusion_tag(filename='blog/inclusion_tag/tag_cloud.html', name='tag_cloud')
def comments(title, num):
    tags = Tag.objects.all()[0:num]
    return {'inclusion_tag': tags, 'title': title}