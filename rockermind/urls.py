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
    path("follower/<int:band_to_follow>", views.follower, name="follower"),
    path("band_page/<int:band_to_look>", views.band_page, name="band_page"),
    path("new_event", views.new_event, name="new_event"),
    path("create_post", views.create_post, name="create_post"),
    path("get_band_posts", views.get_band_posts, name="get_band_posts"),
    path("band_confirmed_event", views.band_confirmed_event, name="band_confirmed_event"),
    path("delete_notif/<int:notif_id>", views.delete_notif, name="delete_notif"),
    path("get_fan_posts", views.get_fan_posts, name="get_fan_posts"),
    path("react_to_post", views.react_to_post, name="react_to_post"),
]