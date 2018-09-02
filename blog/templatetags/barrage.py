from django import template

register = template.Library()


@register.inclusion_tag(filename='blog/inclusion_tag/leave_message.html', name='barrage')
def barrage(theme='warning'):

    themes = {
        'primary': {
            'bg-color': 'u-gradient-half-primary-v1',
            'btn-color': 'btn-warning'
        },
        'warning': {
            'bg-color': 'u-gradient-half-warning-v1',
            'btn-color': 'btn-primary'
        }
    }

    theme = 'warning' if theme not in themes else theme

    return {'bg_color': themes[theme]['bg-color'], 'btn_color': themes[theme]['btn-color']}