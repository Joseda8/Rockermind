# Generated by Django 2.1.5 on 2020-08-30 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rockermind', '0004_auto_20200830_1157'),
    ]

    operations = [
        migrations.AddField(
            model_name='rocker',
            name='genres',
            field=models.ManyToManyField(blank=True, related_name='band', to='rockermind.Genre'),
        ),
    ]
