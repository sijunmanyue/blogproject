from functools import wraps

from django.http import JsonResponse, HttpResponseNotAllowed
from django.utils.log import log_response


class JsonSuccessResponse(JsonResponse):

    def __init__(self, message):
        super().__init__({'status': True, 'message': message})


class JsonFailResponse(JsonResponse):

    def __init__(self, message):
        super().__init__({'status': False, 'message': message})


def require_ajax():
    """
    Decorator to make a view only accept ajax request methods.  Usage::

        @require_ajax
        def my_view(request):
            # I can assume now that only ajax requests make it this far
            # ...

    Note that request methods should be in uppercase.
    """
    def decorator(func):
        @wraps(func)
        def inner(request, *args, **kwargs):
            if not request.is_ajax():
                response = HttpResponseNotAllowed()
                log_response(
                    'Not A Ajax Request (%s): %s', request.method, request.path,
                    response=response,
                    request=request,
                )
                return response
            return func(request, *args, **kwargs)
        return inner
    return decorator