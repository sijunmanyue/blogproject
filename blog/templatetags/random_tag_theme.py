from django import template
import random

register = template.Library()

themes = ('success', 'primary', 'danger', 'warning', 'secondary', 'dark')
THEMES_LEN = len(themes)


@register.filter('random_tag_theme')
def random_tag_theme(value):

    if value > 1:
        return random.sample(themes, 3)
    else:
        return random.sample(themes, 1)[0]