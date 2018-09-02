from django import template
from django.utils import timezone, dateformat
register = template.Library()

TIME_SINCE_FORMAT = {
    'ZH': {
        'FEW_DAYS_AGO': '{0}天前',
        'FEW_HOURS_AGO': '{0}小时前',
        'FEW_MINS_AGO': '{0}分钟前',
        'JUST_NOW': '刚才'
    },
    'EN': {
        'FEW_DAYS_AGO': '{0} DAYS AGO',
        'FEW_HOURS_AGO': '{0} HOURS AGO',
        'FEW_MINS_AGO': '{0} MINS AGO',
        'JUST_NOW': 'JUST NOW'
    }
}
DATE_FORMAT = 'Y-m-d'
LANGS = ('ZH', 'EN')


@register.filter(name='smart_timesince')
def smart_timesince(date, lang='ZH'):
    if lang not in LANGS:
        return date
    now = timezone.now()
    timedelta = now - date
    if 0 < timedelta.days < 10:
        return TIME_SINCE_FORMAT[lang]['FEW_DAYS_AGO'].format(timedelta.days)
    elif timedelta.seconds < 60:
        return TIME_SINCE_FORMAT[lang]['JUST_NOW']
    elif timedelta.seconds < 60 * 60:
        return TIME_SINCE_FORMAT[lang]['FEW_MINS_AGO'].format(timedelta.seconds // 60)
    elif timedelta.seconds < 24 * 60 * 60:
        hour = timedelta.seconds // (60 * 60)
        return TIME_SINCE_FORMAT[lang]['FEW_HOURS_AGO'].format(hour)
    else:
        return dateformat.format(date, DATE_FORMAT)
