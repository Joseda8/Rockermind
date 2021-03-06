# Generated by Django 2.1.5 on 2020-09-07 21:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rockermind', '0013_auto_20200904_1115'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_info', models.TextField(max_length=800)),
                ('post_img', models.ImageField(blank=True, default='posts/None/no-img.jpg', upload_to='posts/')),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('band', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='rockermind.Rocker')),
            ],
        ),
        migrations.AddField(
            model_name='fan',
            name='posts_like',
            field=models.ManyToManyField(blank=True, related_name='fans_likes', to='rockermind.Post'),
        ),
        migrations.AddField(
            model_name='fan',
            name='posts_love',
            field=models.ManyToManyField(blank=True, related_name='fans_loves', to='rockermind.Post'),
        ),
    ]
