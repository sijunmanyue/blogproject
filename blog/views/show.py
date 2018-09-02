from django.shortcuts import render
import os


# index page
def showmodule(request, module, file):
    file = file if file.endswith('.html') else file + '.html'
    return render(request, os.path.join('blog', module, file))


def show(request, file):
    file = file if file.endswith('.html') else file + '.html'
    return render(request, os.path.join('blog', file))
