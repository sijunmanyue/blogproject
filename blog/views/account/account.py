import base64
import os
import re
import uuid
from functools import partial

from PIL import Image
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.cache import cache
from django.core.files.base import ContentFile
from django.core.handlers.wsgi import WSGIRequest
from django.db.models import Q
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.http import require_GET, require_POST

from blog.models import UserInfo, Job
from blog.utils.http import (JsonSuccessResponse,
                             JsonFailResponse)
from blog.utils.thread_email import send_mail
from blog.views.account import captcha
from blogproject import settings

send_forget_password_mail = partial(send_mail, '密码找回邮件确认', '', '1147883997@qq.com')

EMAIL_PATTERN = r'^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$'


@require_POST
def do_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    if not username or not password:
        return JsonFailResponse('username or password is null')

    user = User.objects.filter(Q(username=username) | Q(email=username)).first()
    if not user or not user.check_password(password):
        return JsonFailResponse('username or password is wrong')

    login(request, user)
    return JsonSuccessResponse('login success')


@require_POST
def register(request):
    username = request.POST.get('username')
    password = request.POST.get('password')

    if not username or not password:
        return JsonFailResponse('username or password is null')

    try:
        user = User.objects.create_user(request.POST['username'], '', request.POST['password'])
        user.save()
    except Exception as e:
        print(e)
        return JsonFailResponse('create user failed')
    else:
        user_info = UserInfo()
        user_info.user = user
        user_info.save()
        login(request, user)

    return JsonSuccessResponse('register success')


def is_login(request):
    return not request.user.is_anonymous


@login_required
def do_logout(request):
    logout(request)
    return HttpResponseRedirect('/blog/articles/')


@login_required
def edit(request):
    return render(request, 'blog/account/edit.html')


@require_POST
@login_required
def do_edit(request):
    nickname = request.POST.get('nickname')
    email = request.POST.get('email')
    signature = request.POST.get('signature')
    gender = request.POST.get('gender')
    job = request.POST.get('job')
    education = request.POST.get('education')
    f_avatar = request.FILES.get('avatar')

    user_info = request.user.userinfo or UserInfo()
    if not nickname or len(nickname) > 50:
        return JsonFailResponse('username is null or too long')
    user_info.nickname = nickname

    if not email or not re.match(EMAIL_PATTERN, email) or email_exists(request):
        return JsonFailResponse('invalid email')
    request.user.email = email

    if signature:
        user_info.signature = signature

    if gender:
        if int(gender) in [i[0] for i in UserInfo.GENDER_CHOICES]:
            user_info.gender = gender
        else:
            return JsonFailResponse('invalid gender')

    if job:
        user_info.job = Job.objects.get(id=job)

    if education:
        user_info.education = education

    if f_avatar:
        ext = os.path.splitext(f_avatar.name)[1]
        if ext not in UserInfo.AVATAR_EXT_LIMITS:
            return JsonFailResponse(f'unsupported ext {ext}')

        if f_avatar.size > UserInfo.AVATAR_SIZE_LIMIT:
            return JsonFailResponse(f'image size is too big')

        f_avatar_con = ContentFile(f_avatar.read())
        f_avatar_name = request.user.username + ext
        user_info.avatar.save(f_avatar_name, f_avatar_con, save=False)

        img = Image.open(os.path.join(settings.MEDIA_ROOT, 'upload', 'images', 'avatar', f_avatar_name))
        out = img.resize(UserInfo.AVATAR_SIZE_DEFAULT, resample=Image.ANTIALIAS)
        out.save(f_avatar_name)

    user_info.save()

    return JsonSuccessResponse('edit success')


def email_exists(request):
    email = request.GET.get('email')
    user = User.objects.filter(email=email).first()
    return user and (request.user.is_authenticated or request.user != user)


@require_GET
def check_username(request):
    username = request.GET.get('username')
    user = User.objects.filter(username=username).first()
    return JsonResponse({'valid': user is None or user == request.user})


@require_GET
def check_email(request):
    return JsonResponse({'valid': not email_exists(request)})


@require_GET
def gen_captcha(request):
    data, code = captcha.draw(font_size=40)
    request.session['{sessionid}_captcha'.format(sessionid=request.COOKIES.get('sessionid'))] = code.upper()
    return HttpResponse(data)


@require_POST
def forget_password(request):
    email = request.POST.get('email')
    captcha_ = request.POST.get('captcha')
    sessionid = request.COOKIES.get('sessionid')
    session_captcha = request.session.get(f'{sessionid}_captcha')

    if not email or not captcha_:
        return JsonFailResponse('email or captcha is null')

    if captcha_.upper() != session_captcha:
        return JsonFailResponse('invalid captcha')

    try:
        send_forget_password_mail(
            [email],
            html_message="""
                Dear JoyBlog user! <br><br><br>
                When you visit JoyBlog, you click the "forget password" link, which is a password reset confirmation message. <br><br>
                You can reset the account password by clicking the following link: <br><br>
                <a href= "target=" target= "_blank" > click on the link to retrieve the password<br>
                To keep your account safe, click on the link within 10 minutes, or you can copy the link to the browser's address bar. <br>
                If you have not tried to modify the password, please ignore this email, and this will inconvenience you. <br><br><br>
                This email is automatically sent by the system, please do not reply directly.
                """
        )
    except BaseException as e:
        print(e)
        return JsonFailResponse('email send failed')
    else:
        key = f'forget_password:{email}'
        value = {
            'uuid_str': base64.b64encode(uuid.uuid4().hex.encode('utf-8')),
            'link_id': base64.b64encode(str(timezone.now().timestamp()).encode('utf-8'))
        }
        cache.set(key, value, timeout=60 * 10)
        return JsonSuccessResponse('email send success')
