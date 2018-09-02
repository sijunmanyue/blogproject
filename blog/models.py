# coding=utf-8
from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Tag(models.Model):

    code = models.CharField(max_length=200, null=False, unique=True, verbose_name='编码')
    name = models.CharField(max_length=200, null=False, verbose_name='名称')
    description = models.CharField(max_length=200, null=True, verbose_name='描述')
    picture = models.ImageField(upload_to='upload/images/tag', blank=True, null=True, verbose_name='图片')
    creationTime = models.DateTimeField(null=True, default = timezone.now, verbose_name='创建时间')
    isShow = models.BooleanField(default=True, verbose_name='前台显示')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural='标签'


class FriLink(models.Model):

    url = models.CharField(max_length=200, null=False, unique=True, verbose_name='URL')
    description = models.CharField(max_length=200, null=False, verbose_name='描述')
    creationTime = models.DateTimeField(null=True, default=timezone.now, verbose_name='创建时间')
    isShow = models.BooleanField(default=True, verbose_name='前台显示')

    def __str__(self):
        return self.url

    class Meta:
        verbose_name_plural='友情链接'


class AboutMe(models.Model):

    nameEn = models.CharField(max_length=200, null=False, verbose_name='英文名')
    nameZh = models.CharField(max_length=200, null=False, verbose_name='中文名')
    headPortrait = models.ImageField(upload_to='upload/images/headPortrait', verbose_name='头像')
    job = models.CharField(max_length=200, null=False, verbose_name='工作')
    introduction = models.CharField(max_length=400, null=False, verbose_name='自我介绍')

    class Meta:
        verbose_name_plural='关于我'


class Category(models.Model):

    code = models.CharField(max_length=200, null=False, unique=True, verbose_name='类别编号')
    name = models.CharField(max_length=200, null=False, verbose_name='类别名称')
    description = models.CharField(max_length=200, null=True, verbose_name='类别描述')
    picture = models.ImageField(upload_to='upload/images/category', blank=True, verbose_name='图片')
    creationTime = models.DateTimeField(null=True, default = timezone.now, verbose_name='创建时间')
    isShow = models.BooleanField(default=True, verbose_name='前台显示')
    isSupCategory = models.BooleanField(default=False, verbose_name='是否是超类')
    supCategory = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, verbose_name='超类')

    def __str__(self):
        return self.code + '-' + self.name


    class Meta:
        verbose_name_plural = '类别'


class Article(models.Model):

    title = models.CharField(max_length=200, null=False, verbose_name='文章标题')
    author = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL, verbose_name='文章作者')
    picture = models.ImageField(upload_to='upload/images/article', blank=True, verbose_name='显示图片')
    summary = models.TextField(max_length=400, null=False, verbose_name='文章摘要')
    loveTime = models.IntegerField(default=0, null=True, blank=True, editable=False, verbose_name='喜欢次数')
    viewTime = models.IntegerField(default=0, null=True, blank=True, editable=False, verbose_name='浏览次数')
    lastArticle = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True
                                    , related_name='Article_lastArticle', verbose_name='上一篇文章')
    nextArticle = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True
                                    , related_name='Article_nextArticle', verbose_name='下一篇文章')
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, blank=False, null=True, verbose_name='文章类别')
    tags = models.ManyToManyField(Tag, verbose_name='标签')
    recommend = models.BooleanField(default=False, verbose_name='是否推荐')
    highQuality = models.BooleanField(default=False, editable=False, verbose_name='是否精品')
    creationTime = models.DateTimeField(null=True, default=timezone.now, editable=False, verbose_name='发布时间')
    content = models.TextField(verbose_name='文章内容')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural='文章'


class Score(models.Model):

    LEVEL_CHOICE = (
        (0, '英勇黄铜'),
        (1, '不屈白银'),
        (2, '荣耀黄金'),
        (3, '华贵铂金'),
        (4, '璀璨钻石'),
        (5, '超凡大师'),
        (6, '最强王者')
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='用户')
    score = models.IntegerField(verbose_name='用户积分')
    level = models.IntegerField(verbose_name='用户等级', default=0, choices=LEVEL_CHOICE)

    def get_level(self):
        return self.LEVEL_CHOICE[self.level][1]

    class Meta:
        verbose_name_plural = '用户积分'


class Action(models.Model):

    DATE_TYPE_CHOICES = (
        ('Article', '文章'),
        ('Comment', '评论')
    )

    code = models.CharField(max_length=200, null=False, unique=True, verbose_name='行为编号')
    description = models.CharField(max_length=200, null=True, verbose_name='行为描述')
    worth = models.IntegerField(verbose_name='行为分')
    dateType = models.CharField(max_length=200, null=False, verbose_name='模型名称', choices=DATE_TYPE_CHOICES)

    def __str__(self):
        return self.description

    class Meta:
        verbose_name_plural = '行为类型'


class Comment(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='用户')
    article = models.ForeignKey(Article, on_delete=models.SET_NULL, blank=False, null=True, verbose_name='文章')
    creationTime = models.DateTimeField(default=timezone.now, verbose_name='评论时间')
    content = models.CharField(max_length=200, blank=False, null=False, verbose_name='评论内容')
    appreciate = models.IntegerField(default=0, verbose_name='被赞次数')
    dislike = models.IntegerField(default=0, verbose_name='被踩次数')

    class Meta:
        verbose_name_plural = '评论'


class Reply(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='用户')
    article = models.ForeignKey(Article, on_delete=models.SET_NULL, blank=False, null=True, verbose_name='文章')
    creationTime = models.DateTimeField(default=timezone.now, verbose_name='评论时间')
    content = models.CharField(max_length=200, blank=False, null=False, verbose_name='评论内容')
    appreciate = models.IntegerField(default=0, verbose_name='被赞次数')
    dislike = models.IntegerField(default=0, verbose_name='被踩次数')
    comment = models.ForeignKey(Comment, blank=True, null=True, related_name='replies', on_delete=models.CASCADE, verbose_name='评论')
    reply_to = models.ForeignKey('self', blank=True, null=True, related_name='replies', on_delete=models.CASCADE, verbose_name='回复主体')

    class Meta:
        verbose_name_plural = '回复'


class Behavior(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='用户')
    action = models.ForeignKey(Action, on_delete=models.CASCADE, verbose_name='行为类型')
    occurTime = models.DateTimeField(verbose_name='行为发生时间', default=timezone.now)
    relatedData = models.IntegerField(verbose_name='关联数据主键')

    def related_data(self):
        date_type_value = self.action.dateType
        if date_type_value == 'Article':
            return Article.objects.get(id=self.relatedData)
        elif date_type_value == 'Comment':
            return

    class Meta:
        verbose_name_plural = '用户行为'


class Job(models.Model):

    name = models.CharField(max_length=200, blank=True, null=True, verbose_name='职业')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = '职业'


class UserInfo(models.Model):
    GENDER_CHOICES = ((1, '男'), (2, '女'), (0, '保密'))
    AVATAR_EXT_LIMITS = ('.jpg', '.jpeg', '.png')
    AVATAR_SIZE_LIMIT = 1048576
    AVATAR_SIZE_DEFAULT = (100, 100)
    EDU_CHOICES = ((1,'大专'), (2, '本科'), (3, '硕士'), (4, '博士'))
    nickname = models.CharField(max_length=200, blank=True, null=True, verbose_name='昵称', default='无名小辈')
    job = models.ForeignKey(Job, blank=True, null=True,on_delete=models.SET_NULL, verbose_name='职业')
    education = models.CharField(max_length=200, blank=True, null=True, verbose_name='学历', choices=EDU_CHOICES)
    signature = models.CharField(max_length=200, blank=True, null=True, verbose_name='签名', default='这位同学很懒，什么也没留下')
    gender = models.IntegerField(blank=True, null=True, verbose_name='性别', choices=GENDER_CHOICES, default=0)
    avatar = models.ImageField(upload_to='upload/images/avatar', blank=True, null=True, verbose_name='头像', default='upload/images/avatar/default.jpg')
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='用户')

    class Meta:
        verbose_name_plural = '用户其他信息'


class LeaveMessage(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='用户')
    content = models.CharField(max_length=200, blank=True, null=True, verbose_name='留言内容')
    creationTime = models.DateTimeField(verbose_name='留言时间', default=timezone.now)

    def __str__(self):
        return self.content

    class Meta:
        verbose_name_plural = '用户留言'


