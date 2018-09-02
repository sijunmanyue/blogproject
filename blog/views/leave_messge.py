from blog.models import LeaveMessage
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
import json,re


@login_required
def leave_message(request):
    """
    用户留言功能
    :param request:
    :return:
    """
    content = request.POST.get('content', None)
    if content is None:
        return HttpResponse(json.dumps({'status':False, 'message':'留言内容不能为空'}), content_type='application/json')
    elif len(re.sub(r'[^\x00-\xff]', 'aa', content)) > 60:
        return HttpResponse(json.dumps({'status': False, 'message': '留言内容太长'}), content_type='application/json')

    message = LeaveMessage()
    message.content = content
    message.user = request.user
    message.save()

    return HttpResponse(json.dumps({'status':True, 'message':'留言成功'}), content_type='application/json')