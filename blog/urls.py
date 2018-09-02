from django.urls import path, re_path

from blog.views import index, upload, article, comment, account, reptile, vedio, leave_messge, topic


app_name = 'blog'

urlpatterns = [
    path('', index.index, name='index'),
    path('upload/', upload.upload, name='upload'),
]

# Links about article
urlpatterns += [
    path('detail/<int:article_id>/', article.get_article_by_id, name='article-detail'),
    re_path(r'^articles/(?:page/(?P<page>\d+)/)?$', article.lists, name='articles-list'),
    re_path(r'^articles/tag/(?P<tag>\w+)/(?:page/(?P<page>\d+)/)?$', article.get_articles_by_tag, name='articles-tag'),
    re_path(r'^articles/(?P<cate>\w+)/(?:page/(?P<page>\d+)/)?$', article.get_articles_by_category, name='articles-cate'),
    path('comment/appreciate/', comment.comment_appreciate, name='comment-appreciate'),
    path('comment/dislike/', comment.comment_dislike, name='comment-dislike'),
    path('reply/dislike/', comment.reply_dislike, name='reply-dislike'),
    path('reply/appreciate/', comment.reply_appreciate, name='reply-appreciate'),
    path('reply/', comment.reply, name='article-comment'),
    path('comment/', comment.comment, name='article-comment'),
    path('comment/load_more/', comment.load_comments, name='comment-loadmore'),
]

# Links about account
urlpatterns += [
    path('user/login/', account.do_login, name='user-login'),
    path('user/logout/', account.do_logout, name='user-logout'),
    path('user/register/', account.register, name='user-register'),
    path('user/edit/', account.edit, name='user-edit'),
    path('user/do-edit/', account.do_edit, name='user-do-edit'),
    path('user/check-username/', account.check_username, name='user-check-username'),
    path('user/check-email/', account.check_email, name='user-check-email'),
    path('user/forget-password/', account.forget_password, name='user-forget-password'),
    path('user/captcha/', account.gen_captcha, name='user-gen-captcha'),
]

# Others Lnks
urlpatterns += [
    path('message/', leave_messge.leave_message, name='message-leave'),
    path('reptiles/', reptile.lists, name='reptiles-lists'),
    path('videos/', vedio.lists, name='videos-lists'),
    path('topics/', topic.lists, name='topics'),
]

