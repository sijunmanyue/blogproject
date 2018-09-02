from django.contrib.auth.models import User
from django.shortcuts import render


# index page
from blog.apps import BlogConfig
from blog.models import Article


def index(request):
    articles = Article.objects.all()
    author = User.objects.get(username=BlogConfig.author_name)
    return render(request, 'blog/index/index.html', {
        'articles': articles,
        'author': author})