from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.core.files.storage import FileSystemStorage
from django.urls import reverse

from .models import Genre, Role, MyUser, Fan, Rocker, Owner
import time
import json
import random
import base64

def render_page_by_role(request):
    try:
        current_user_role = MyUser.objects.filter(user=request.user).first().role.role
    except:
        pass
    if not request.user.is_authenticated:
        return render(request, "rockermind/index.html", {"message": None})
    elif(current_user_role=="Fan"):
        pass
    elif(current_user_role=="Rockstar"):
        pass
    elif(current_user_role=="Owner"):
        return render(request, "rockermind/owner.html")

# Create your views here.
def index(request):

    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        role = request.POST["role"]
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            myUser = MyUser.objects.filter(user=user).first()
            if(myUser.role.role!=role):
                return render(request, "rockermind/index.html", {"message": f"User {username} exist but the role is not {role}"})
            login(request, user)

            if(role=="Fan"):
                return render(request, "rockermind/index_template.html")
            elif(role=="Rockstar"):
                return render(request, "rockermind/index_template.html")
            elif(role=="Owner"):
                return render(request, "rockermind/owner.html")
            
        else:
            return render(request, "rockermind/index.html", {"message": f"The user {username} or its password are wrong"})
    else:
        return render_page_by_role(request)

def motivation(request):
    return render(request, "rockermind/motivation.html")

def sign_up(request):

    if request.method == "POST":

        username_request = request.POST["username"]
        password_request = request.POST["password"]
        role = request.POST["role"]
        role_new = Role.objects.filter(role=role).first()
        #fs = FileSystemStorage()
        #fs.save(f"C:/Users/jdmon/OneDrive/Escritorio/CS50W/rockpage/{band_img.name}", band_img)
        #fs.save(f"C:/Users/jdmon/OneDrive/Escritorio/CS50W/rockpage/{band_logo.name}", band_logo)

        UserModel = get_user_model()
        if not UserModel.objects.filter(username=username_request).exists():
            new_user=UserModel.objects.create_user(username_request, password=password_request)
            new_user.save()

            new_myUser = MyUser(user=new_user, role=role_new)
            new_myUser.save()

            if(role=="Fan"):
                first_name = request.POST["first_name"]
                last_name = request.POST["last_name"]
                favorite_genre = request.POST["favorite_genre"]
                genre = Genre.objects.filter(genre=favorite_genre).first()

                new_fan = Fan(user=new_myUser, first_name=first_name, last_name=last_name, tastes=genre)
                new_fan.save()

            elif(role=="Rockstar"):
                band_name = request.POST["band_name"]
                band_img = request.FILES["band_img"]
                band_logo = request.FILES["band_logo"]
                band_genre = request.POST["band_genre"]
                song_1 = request.POST["song_1"]
                song_2 = request.POST["song_2"]
                song_3 = request.POST["song_3"]
                band_info = request.POST["band_info"]

                genre = Genre.objects.filter(genre=band_genre).first()

                if(song_1 == ""):
                    song_1 = "NOT_SONG"
                if(song_2 == ""):
                    song_2 = "NOT_SONG"
                if(song_3 == ""):
                    song_3 = "NOT_SONG"

                new_rocker = Rocker(user=new_myUser, band_name=band_name, band_img=band_img, band_logo=band_logo,
                genres=genre, biography=band_info, url_song_1=song_1, url_song_2=song_2, url_song_3=song_3)
                new_rocker.save()

            elif(role=="Owner"):
                place_name = request.POST["place_name"]
                place_location = request.POST["place_location"]
                place_img = request.FILES["place_img"]

                new_place = Owner(user=new_myUser, place_name=place_name, location=place_location, place_img=place_img)
                new_place.save()

        return render(request, "rockermind/index.html", {
        "message": "Successful registration"})


    roles = Role.objects.all()
    return render(request, "rockermind/sign_up.html", {
        "roles": roles
    })

def do_logout(request):
    logout(request)
    return render_page_by_role(request)

def get_genres(request):
    genres = Genre.objects.all()
    data = []
    for genre in genres:
        data.append(genre.genre)

    return JsonResponse({
        "genres": data
    })

def search_band(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    band_to_search = body['band_to_search']

    all_bands = Rocker.objects.all()
    similar_bands = []

    for band in all_bands:
        if(band_to_search in band.band_name):
            similar_bands.append(band)

    bands_to_send = []
    for band in similar_bands:
        bands_to_send.append({"band_name": band.band_name, 
            "band_logo": base64.b64encode(band.band_logo.read()).decode('utf-8'),
            "band_genre": band.genres.genre,
            "band_id": band.id
            })

    return JsonResponse({
        "bands": bands_to_send
    })

def events(request):
    print("EVENTS")
    return render_page_by_role(request)

def profile(request):
    print("PROFILE")
    return render_page_by_role(request)


def get_bands(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    bands_save = body['bands_save']

    bands = Rocker.objects.all()
    len_bands = len(bands)

    start = int(request.GET.get("start") or 0)
    end = int(request.GET.get("end") or (start + 9))

    number_posts = end-start+1
    bands_to_send_index = []
    i = 0
    while(i<number_posts):
        rand_num = random.randint(0, len_bands-1)
        if(not(rand_num in bands_to_send_index)):
            bands_to_send_index.append(rand_num)
            i+=1

    bands_to_send = []
    for band in bands_to_send_index:
        if(not(bands[band].band_name in bands_save)):
            bands_to_send.append({"band_name": bands[band].band_name, 
            "band_logo": base64.b64encode(bands[band].band_logo.read()).decode('utf-8'),
            "band_genre": bands[band].genres.genre,
            "band_id": bands[band].id
            })

    return JsonResponse({
        "bands": bands_to_send
})

def posts(request):
    start = int(request.GET.get("start") or 0)
    end = int(request.GET.get("end") or (start + 9))

    # Generate list of posts
    data = []
    for i in range(start, end + 1):
        data.append(f"Post #{i}")

    # Return list of posts
    return JsonResponse({
        "posts": data,
})


def band_page(request, band_to_look):
    band = Rocker.objects.filter(id=band_to_look).first()

    songs_to_analize = [band.url_song_1, band.url_song_2, band.url_song_3]
    songs = []
    for song in songs_to_analize:
        if(song!="NOT_SONG"):
            songs.append(song.replace("watch?v=", "embed/"))

    song_1 = songs[0]
    songs.remove(songs[0])

    return render(request, "rockermind/band_page.html", {
        "band_name": band.band_name,
        "biography": band.biography,
        "genre": band.genres,
        "band_logo": base64.b64encode(band.band_logo.read()).decode('utf-8'),
        "band_img": base64.b64encode(band.band_img.read()).decode('utf-8'),
        "song_1": song_1,
        "songs": songs
        })