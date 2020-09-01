from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.core.files.storage import FileSystemStorage
from django.urls import reverse

from .models import Genre, Role, MyUser, Fan, Rocker, Owner

# Create your views here.
def index(request):

    if not request.user.is_authenticated:
        return render(request, "rockermind/index.html", {"message": None})

    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        role = request.POST["role"]

        print(f"Username: {username}")
        print(f"Password: {password}")
        print(f"Role: {role}")
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            myUser = MyUser.objects.filter(user=user).first()
            if(myUser.role.role!=role):
                return render(request, "rockermind/index.html", {"message": f"User {username} exist but the role is not {role}"})
            login(request, user)
            return render(request, "rockermind/index_template.html")
        else:
            return render(request, "rockermind/index.html", {"message": f"The user {username} or its password are wrong"})

    return render(request, "rockermind/index.html", {
        "message": None})

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


def get_genres(request):
    genres = Genre.objects.all()
    data = []
    for genre in genres:
        data.append(genre.genre)

    return JsonResponse({
        "genres": data
    })