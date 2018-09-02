import  re,os

os.environ['DJANGO_SETTINGS_MODULE'] = 'blogproject.settings'

# print(re.sub('\W', '', '你好andkdkdk_.&^%$#@!'))
#
# print(re.match('\W', '你好'))

print(re.search('([\u4e00-\u9fa5])([\w.])', '哈www.runoob.com').groups())  # 在起始位置匹配

from django.utils import timezone
print(timezone.now().timestamp())