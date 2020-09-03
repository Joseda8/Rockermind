from django.urls import path

from . import views

app_name = "rockermind"
urlpatterns = [
    path("", views.index, name="index"),
    path("motivation", views.motivation, name="motivation"),
    path("sign_up", views.sign_up, name="sign_up"),
    path("logout", views.do_logout, name="logout"),
    path("get_genres", views.get_genres, name="get_genres"),
    path("posts", views.posts, name="posts"),
    path("search_band", views.search_band, name="search_band"),
    path("events", views.events, name="events"),
    path("profile", views.profile, name="profile"),
    path("get_bands", views.get_bands, name="get_bands"),
    path("band_page/<int:band_to_look>", views.band_page, name="band_page"),
]