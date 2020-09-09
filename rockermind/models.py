from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Genre(models.Model):
    genre = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.genre}"

class Role(models.Model):
    role = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.role}"

class MyUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name="users")

class Rocker(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="bands")
    band_name = models.CharField(max_length=30)
    band_img = models.ImageField(upload_to = 'band_members/', default = 'band_members/None/no-img.jpg')
    band_logo = models.ImageField(upload_to = 'band_logo/', default = 'band_logo/None/no-img.jpg')
    genres = models.ForeignKey(Genre, blank=True, on_delete=models.CASCADE, related_name="band")
    biography = models.TextField(max_length=1024, blank=True)
    url_song_1 = models.CharField(max_length=250, blank=True)
    url_song_2 = models.CharField(max_length=250, blank=True)
    url_song_3 = models.CharField(max_length=250, blank=True)

class Post(models.Model):
    band = models.ForeignKey(Rocker, on_delete=models.CASCADE, related_name="posts")
    post_info = models.TextField(max_length=800)
    post_img = models.ImageField(upload_to = 'posts/', default = 'posts/None/no-img.jpg', blank=True)
    date = models.DateField()
    time = models.TimeField()

class Fan(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="fans")
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    tastes = models.ForeignKey(Genre, blank=True, on_delete=models.CASCADE, related_name="fans")
    posts_like = models.ManyToManyField(Post, blank=True, related_name="fans_likes")
    posts_love = models.ManyToManyField(Post, blank=True, related_name="fans_loves")
    following = models.ManyToManyField(Rocker, blank=True, related_name="followers")

class Owner(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="owners")
    place_name = models.CharField(max_length=30)
    location = models.TextField(max_length=800)
    place_img = models.ImageField(upload_to = 'places/', default = 'places/None/no-img.jpg')

class Event(models.Model):
    place = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name="events")
    date = models.DateField()
    time = models.TimeField() 
    cost = models.FloatField()
    adult = models.BooleanField()
    info = models.TextField(max_length=1024, blank=True)
    is_confirmed = models.BooleanField()

class Band_by_event(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="bands")
    band = models.ForeignKey(Rocker, on_delete=models.CASCADE, related_name="events")
    is_confirmed = models.BooleanField()

class Notification(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="notifications")
    date = models.DateField()
    time = models.TimeField()
    content = models.TextField(max_length=800)