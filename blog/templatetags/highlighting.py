from django import template
from django.template.defaultfilters import stringfilter
from django.utils.safestring import mark_safe

register = template.Library()

WRAPPER = '<span class="text-{0} font-weight-bold">{1}</span>'
THEMES = ('success', 'primary', 'danger', 'warning', 'secondary', 'dark')


@register.simple_tag(name='highlighting')
def highlighting(value, words, theme):

    if not words:
        return value
    else:
        color = theme if theme in THEMES else 'primary'
        for word in words:
            value = value.replace(word, WRAPPER.format(color, word))
    return mark_safe(value)