from blog.models import Category
import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'myblog.settings'

print(Category.objects.all())