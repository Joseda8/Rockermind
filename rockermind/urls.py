from django.urls import path

from . import views

app_name = "rockermind"
urlpatterns = [
    path("", views.index, name="index"),
    path("motivation", views.motivation, name="motivation"),
    path("sign_up", views.sign_up, name="sign_up"),
    path("get_genres", views.get_genres, name="get_genres"),
]