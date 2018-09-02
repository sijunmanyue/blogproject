from django.shortcuts import render


# index page
def help(request):
    return render(request, 'blog/help/help.html')