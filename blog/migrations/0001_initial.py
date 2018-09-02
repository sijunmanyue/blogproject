# Generated by Django 2.1 on 2018-08-09 13:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AboutMe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nameEn', models.CharField(max_length=200, verbose_name='英文名')),
                ('nameZh', models.CharField(max_length=200, verbose_name='中文名')),
                ('headPortrait', models.ImageField(upload_to='upload/images/headPortrait', verbose_name='头像')),
                ('job', models.CharField(max_length=200, verbose_name='工作')),
                ('introduction', models.CharField(max_length=400, verbose_name='自我介绍')),
            ],
            options={
                'verbose_name_plural': '关于我',
            },
        ),
        migrations.CreateModel(
            name='Action',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=200, unique=True, verbose_name='行为编号')),
                ('description', models.CharField(max_length=200, null=True, verbose_name='行为描述')),
                ('worth', models.IntegerField(verbose_name='行为分')),
                ('dateType', models.CharField(choices=[('Article', '文章'), ('Comment', '评论')], max_length=200, verbose_name='模型名称')),
            ],
            options={
                'verbose_name_plural': '行为类型',
            },
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='文章标题')),
                ('picture', models.ImageField(blank=True, upload_to='upload/images/article', verbose_name='显示图片')),
                ('summary', models.TextField(max_length=400, verbose_name='文章摘要')),
                ('loveTime', models.IntegerField(blank=True, default=0, editable=False, null=True, verbose_name='喜欢次数')),
                ('viewTime', models.IntegerField(blank=True, default=0, editable=False, null=True, verbose_name='浏览次数')),
                ('recommend', models.BooleanField(default=False, verbose_name='是否推荐')),
                ('highQuality', models.BooleanField(default=False, editable=False, verbose_name='是否精品')),
                ('creationTime', models.DateTimeField(default=django.utils.timezone.now, editable=False, null=True, verbose_name='发布时间')),
                ('content', models.TextField(verbose_name='文章内容')),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='文章作者')),
            ],
            options={
                'verbose_name_plural': '文章',
            },
        ),
        migrations.CreateModel(
            name='Behavior',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('occurTime', models.DateTimeField(default=django.utils.timezone.now, verbose_name='行为发生时间')),
                ('relatedData', models.IntegerField(verbose_name='关联数据主键')),
                ('action', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blog.Action', verbose_name='行为类型')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='用户')),
            ],
            options={
                'verbose_name_plural': '用户行为',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=200, unique=True, verbose_name='标签编号')),
                ('name', models.CharField(max_length=200, verbose_name='标签名称')),
                ('description', models.CharField(max_length=200, null=True, verbose_name='标签描述')),
                ('picture', models.ImageField(blank=True, upload_to='upload/images/category', verbose_name='图片')),
                ('creationTime', models.DateTimeField(default=django.utils.timezone.now, null=True, verbose_name='创建时间')),
                ('isShow', models.BooleanField(default=True, verbose_name='前台显示')),
                ('isSupCategory', models.BooleanField(default=False, verbose_name='是否是超类')),
                ('supCategory', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='blog.Category', verbose_name='超类')),
            ],
            options={
                'verbose_name_plural': '类别',
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creationTime', models.DateTimeField(default=django.utils.timezone.now, verbose_name='评论时间')),
                ('content', models.CharField(max_length=200, verbose_name='评论内容')),
                ('appreciate', models.IntegerField(default=0, verbose_name='被赞次数')),
                ('dislike', models.IntegerField(default=0, verbose_name='被踩次数')),
                ('article', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='blog.Article', verbose_name='文章')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='用户')),
            ],
            options={
                'verbose_name_plural': '评论',
            },
        ),
        migrations.CreateModel(
            name='FriLink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=200, unique=True, verbose_name='URL')),
                ('description', models.CharField(max_length=200, verbose_name='描述')),
                ('creationTime', models.DateTimeField(default=django.utils.timezone.now, null=True, verbose_name='创建时间')),
                ('isShow', models.BooleanField(default=True, verbose_name='前台显示')),
            ],
            options={
                'verbose_name_plural': '友情链接',
            },
        ),
        migrations.CreateModel(
            name='Reply',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creationTime', models.DateTimeField(default=django.utils.timezone.now, verbose_name='评论时间')),
                ('content', models.CharField(max_length=200, verbose_name='评论内容')),
                ('appreciate', models.IntegerField(default=0, verbose_name='被赞次数')),
                ('dislike', models.IntegerField(default=0, verbose_name='被踩次数')),
                ('article', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='blog.Article', verbose_name='文章')),
                ('comment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='blog.Comment', verbose_name='评论')),
                ('reply_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='blog.Reply', verbose_name='回复主体')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='用户')),
            ],
            options={
                'verbose_name_plural': '回复',
            },
        ),
        migrations.CreateModel(
            name='Score',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(verbose_name='用户积分')),
                ('level', models.IntegerField(choices=[(0, '英勇黄铜'), (1, '不屈白银'), (2, '荣耀黄金'), (3, '华贵铂金'), (4, '璀璨钻石'), (5, '超凡大师'), (6, '最强王者')], default=0, verbose_name='用户等级')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='用户')),
            ],
            options={
                'verbose_name_plural': '用户积分',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=200, unique=True, verbose_name='编码')),
                ('name', models.CharField(max_length=200, verbose_name='名称')),
                ('description', models.CharField(max_length=200, null=True, verbose_name='描述')),
                ('picture', models.ImageField(blank=True, null=True, upload_to='upload/images/tag', verbose_name='图片')),
                ('creationTime', models.DateTimeField(default=django.utils.timezone.now, null=True, verbose_name='创建时间')),
                ('isShow', models.BooleanField(default=True, verbose_name='前台显示')),
            ],
            options={
                'verbose_name_plural': '标签',
            },
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nickname', models.CharField(max_length=200, null=True, verbose_name='昵称')),
                ('avatar', models.ImageField(blank=True, upload_to='upload/images/avatar', verbose_name='头像')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='用户')),
            ],
        ),
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='blog.Category', verbose_name='文章类别'),
        ),
        migrations.AddField(
            model_name='article',
            name='lastArticle',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Article_lastArticle', to='blog.Article', verbose_name='上一篇文章'),
        ),
        migrations.AddField(
            model_name='article',
            name='nextArticle',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Article_nextArticle', to='blog.Article', verbose_name='下一篇文章'),
        ),
        migrations.AddField(
            model_name='article',
            name='inclusion_tag',
            field=models.ManyToManyField(to='blog.Tag', verbose_name='标签'),
        ),
    ]