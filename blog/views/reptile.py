from django.shortcuts import render

from blog.apps import BlogConfig
from blog.models import Article


def lists(request):
    reptiles = Article.objects.filter(tags__code=BlogConfig.reptile_tag_code).order_by('creationTime')
    return render(request, 'blog/reptile/reptiles.html', {'reptiles': reptiles})