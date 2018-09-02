from django.http import HttpResponse
from blogproject.settings import *
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
import json
import os


@csrf_exempt
def upload (request):

    allow = ('.bmp', '.jpg', '.jpeg', '.png')
    file_obj = request.FILES.get('file')

    file_ext = os.path.splitext(file_obj.name)[1]
    if file_ext not in allow:
        return HttpResponse(json.dumps({'location': ''})
                            , content_type="application/json")

    new_file_name = 'i' + str(int(datetime.now().timestamp())) + file_ext
    with open(os.path.join(MEDIA_ROOT, 'upload','images', 'article', new_file_name), 'wb') as f:
        for chunk in file_obj.chunks():
            f.write(chunk)

    media_path = os.path.join(MEDIA_URL, 'upload', 'images', 'article', new_file_name)
    return HttpResponse(json.dumps({'location':media_path}), content_type="application/json")