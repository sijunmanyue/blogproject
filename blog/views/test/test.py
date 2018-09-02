from django.db.models.manager import BaseManager
from django.http import HttpResponse
from blog.models import Category
from django.core import serializers


def test_param(request, param):
    return HttpResponse(param)


def test(request):
    a = BaseManager.from_queryset('User')
    print(type(a))
    print(a)
    return HttpResponse('恭喜你，項目搭建完成.')


def category_tree(request):
    supCategories = Category.objects.filter(isSupCategory=True)
    return HttpResponse(serializers.serialize('python', supCategories))



