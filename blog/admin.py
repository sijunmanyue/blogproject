from django.contrib import admin
from blog.models import Tag, FriLink, AboutMe, Category, Article
from blog.models import Action, Score, Behavior, Comment, Reply, UserInfo, LeaveMessage, Job


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'description', 'picture', 'creationTime', 'isShow']
    ordering = ['creationTime']
    list_filter = ['isShow']


@admin.register(FriLink)
class FriLinkAdmin(admin.ModelAdmin):
    list_display = ['url', 'description', 'creationTime', 'isShow']
    ordering = ['creationTime']
    list_filter = ['isShow']


@admin.register(AboutMe)
class AboutMeAdmin(admin.ModelAdmin):
    list_display = ['nameEn', 'nameZh', 'headPortrait', 'job', 'introduction']
    ordering = ['nameEn']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'description', 'picture', 'creationTime', 'isShow', 'isSupCategory', 'supCategory']
    ordering = ['-isSupCategory', 'code', 'name']
    search_fields = ['name', 'isSupCategory']
    list_filter = ['isSupCategory', 'isShow']

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "supCategory":
            kwargs["queryset"] = Category.objects.filter(isSupCategory=True)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'recommend', 'viewTime', 'loveTime', 'highQuality', 'creationTime']
    ordering = ['-creationTime']

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "category":
            kwargs["queryset"] = Category.objects.filter(isSupCategory=False)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    class Media:
        js = (
            '/static/blog/plugins/tinymce/tinymce.min.js',
            '/static/admin/js/textarea.js',
           )
        css = {
            'all':('/static/admin/css/textarea.css', )
        }


@admin.register(Action)
class ActionAdmin(admin.ModelAdmin):
    list_display = ['code', 'description', 'worth']
    ordering = ['-worth']


@admin.register(Score)
class ScoresAdmin(admin.ModelAdmin):
    list_display = ['user', 'score', 'level']
    ordering = ['-level', '-score']


@admin.register(Behavior)
class BehaviorAdmin(admin.ModelAdmin):
    list_display = ['user', 'action', 'occurTime', 'relatedData']
    ordering = ['user', '-occurTime']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['user', 'article', 'appreciate', 'content', 'creationTime']
    ordering = ['-creationTime']


@admin.register(Reply)
class ReplyAdmin(admin.ModelAdmin):
    list_display = ['user', 'article', 'comment', 'appreciate', 'content', 'creationTime']
    ordering = ['-creationTime']


@admin.register(UserInfo)
class UserInfoAdmin(admin.ModelAdmin):
    list_display = ['user', 'nickname', 'avatar']


@admin.register(LeaveMessage)
class LeaveMessageAdmin(admin.ModelAdmin):
    list_display = ['user', 'content', 'creationTime']


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['name']