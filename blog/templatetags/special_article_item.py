from django import template

register = template.Library()


@register.filter(name='special_article_item')
def special_article_item(counter):
    return (counter + 2) % 6 == 0