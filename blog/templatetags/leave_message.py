from django import template
from blog.models import LeaveMessage

register = template.Library()


@register.inclusion_tag(filename='blog/inclusion_tag/leave_message.html', name='leave_message')
def leave_message():
    messages = LeaveMessage.objects.order_by('-creationTime')[0:20]

    return {'messages': messages}