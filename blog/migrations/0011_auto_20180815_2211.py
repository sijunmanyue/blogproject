# Generated by Django 2.1 on 2018-08-15 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0010_auto_20180815_2207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfo',
            name='gender',
            field=models.IntegerField(blank=True, choices=[(1, '男'), (2, '女'), (0, '保密')], default=0, null=True, verbose_name='性别'),
        ),
    ]
