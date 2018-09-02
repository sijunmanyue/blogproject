from django.shortcuts import render, render_to_response


def page_not_found(request):
    return render_to_response('404.html')

