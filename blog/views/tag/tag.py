from django.shortcuts import render
from blog.models import Tag


def lists(request):

    tags = Tag.objects.all()
    count = len(tags)
    tags = [tags[i:i+3] for i in range(0, len(tags), 3)]
    return render(request, 'blog/tag/tags.html', {'tags': tags, 'count': count})