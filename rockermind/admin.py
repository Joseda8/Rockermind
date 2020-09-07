from django.contrib import admin
from .models import Genre, Role, MyUser, Fan, Rocker, Owner, Event, Band_by_event, Post

# Register your models here.
admin.site.register(Genre)
admin.site.register(Role)
admin.site.register(MyUser)
admin.site.register(Fan)
admin.site.register(Rocker)
admin.site.register(Owner)
admin.site.register(Event)
admin.site.register(Band_by_event)
admin.site.register(Post)

