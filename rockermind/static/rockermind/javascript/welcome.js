localStorage.clear();

if (!localStorage.getItem('genres')) {
  var initializer_array = [];
  localStorage.setItem("genres", JSON.stringify(initializer_array));
}

if (!localStorage.getItem('files')) {
  var initializer = 0;
  localStorage.setItem("files", initializer);
}

function save_genre(genre){
  var storedGenres = JSON.parse(localStorage.getItem("genres"));
  storedGenres.push(genre);
  localStorage.setItem("genres", JSON.stringify(storedGenres));
}

function insert_line_into_HTML(element){
  const line = document.createElement('br');
  document.querySelector(element).append(line);
}

function loadImg(event, location){
  var image = document.getElementById(location);
  image.src = URL.createObjectURL(event.target.files[0]);
  localStorage.setItem("files", parseInt(localStorage.getItem("files"))+1);
}


function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function clear_signUp_form(){
  const form = document.getElementById("sign_up_form");
  while (form.firstChild) {
    form.removeChild(form.lastChild);
  }
}

function check_fields_fan_sign_up(){
  const submit = document.querySelector('#sign_up_btn');
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');
  const first_name = document.querySelector('#first_name');
  const last_name = document.querySelector('#last_name');
  if (username.value.length > 0 && username.value.length <= 30 
    && password.value.length > 0 && password.value.length <= 30
    && first_name.value.length > 0 && first_name.value.length <= 30
    && last_name.value.length > 0 && last_name.value.length <= 30) {
    submit.disabled = false;
  }else{
    submit.disabled = true;
  }
}

function check_fields_rockstar_sign_up(){
  const submit = document.querySelector('#sign_up_btn');
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');
  const band_name = document.querySelector('#band_name');
  const band_info = document.querySelector('#band_info');
  const song_1 = document.querySelector('#song_1');
  const song_2 = document.querySelector('#song_2');
  const song_3 = document.querySelector('#song_3');
  if (username.value.length > 0 && username.value.length <= 30 
    && password.value.length > 0 && password.value.length <= 30
    && band_name.value.length > 0 && band_name.value.length <= 30
    && band_info.value.length > 0 && band_info.value.length <= 1024
    && parseInt(localStorage.getItem("files")) >= 2
    && song_1.value.length > 0 && song_1.value.length <= 250
    && song_2.value.length > 0 && song_2.value.length <= 250
    && song_3.value.length > 0 && song_3.value.length <= 250) {
    submit.disabled = false;
  }else{
    submit.disabled = true;
  }
}

function check_fields_owner_sign_up(){
  const submit = document.querySelector('#sign_up_btn');
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');
  const place_name = document.querySelector('#place_name');
  const place_location = document.querySelector('#place_location');
  if (username.value.length > 0 && username.value.length <= 30 
    && password.value.length > 0 && password.value.length <= 30
    && place_name.value.length > 0 && place_name.value.length <= 30
    && place_location.value.length > 0 && place_location.value.length <= 800
    && parseInt(localStorage.getItem("files")) >= 1) {
    submit.disabled = false;
  }else{
    submit.disabled = true;
  }
}

function show_fan_signUp_form(genres){
  insert_line_into_HTML("#sign_up_form");

  const first_name_lbl = document.createElement('label');
  first_name_lbl.innerHTML = "First name";
  document.querySelector('#sign_up_form').append(first_name_lbl);

  const first_name_input = document.createElement('input');
  first_name_input.setAttribute("class", "form-control");
  first_name_input.setAttribute("type", "text");
  first_name_input.setAttribute("autofocus", null);
  first_name_input.setAttribute("autocomplete", "off");
  first_name_input.setAttribute("name", "first_name");
  first_name_input.setAttribute("placeholder", "First name");
  first_name_input.setAttribute("id", "first_name");
  document.querySelector('#sign_up_form').append(first_name_input);

  insert_line_into_HTML("#sign_up_form");

  const last_name_lbl = document.createElement('label');
  last_name_lbl.innerHTML = "Last name";
  document.querySelector('#sign_up_form').append(last_name_lbl);

  const last_name_input = document.createElement('input');
  last_name_input.setAttribute("class", "form-control");
  last_name_input.setAttribute("type", "text");
  last_name_input.setAttribute("autofocus", null);
  last_name_input.setAttribute("autocomplete", "off");
  last_name_input.setAttribute("name", "last_name");
  last_name_input.setAttribute("placeholder", "Last name");
  last_name_input.setAttribute("id", "last_name");
  document.querySelector('#sign_up_form').append(last_name_input);

  insert_line_into_HTML("#sign_up_form");

  const label = document.createElement('label');
  label.innerHTML = "Favorite genre";
  document.querySelector('#sign_up_form').append(label);

  const select_genres = document.createElement('select');
  select_genres.setAttribute("name", "favorite_genre");
  select_genres.setAttribute("class", "form-control");

  genres.forEach(function(genre, index, array) {
    const option_genre = document.createElement('option');
    option_genre.setAttribute("value", genre);
    option_genre.innerHTML = genre;
    select_genres.append(option_genre);
  })
  insert_line_into_HTML("#sign_up_form");
  document.querySelector('#sign_up_form').append(select_genres);
}


function show_rockstar_signUp_form(genres){
  insert_line_into_HTML("#sign_up_form");

  const band_name_lbl = document.createElement('label');
  band_name_lbl.innerHTML = "Band name";
  document.querySelector('#sign_up_form').append(band_name_lbl);

  const band_name_input = document.createElement('input');
  band_name_input.setAttribute("class", "form-control");
  band_name_input.setAttribute("type", "text");
  band_name_input.setAttribute("autofocus", null);
  band_name_input.setAttribute("autocomplete", "off");
  band_name_input.setAttribute("name", "band_name");
  band_name_input.setAttribute("placeholder", "Band name");
  band_name_input.setAttribute("id", "band_name");
  document.querySelector('#sign_up_form').append(band_name_input);


  insert_line_into_HTML("#sign_up_form");

  const band_info_lbl = document.createElement('label');
  band_info_lbl.innerHTML = "Band biography";
  document.querySelector('#sign_up_form').append(band_info_lbl);

  const band_info_input = document.createElement('textarea');
  band_info_input.setAttribute("class", "form-control");
  band_info_input.setAttribute("type", "text");
  band_info_input.setAttribute("rows", "4");
  band_info_input.setAttribute("name", "band_info");
  band_info_input.setAttribute("placeholder", "Band biography");
  band_info_input.setAttribute("id", "band_info");
  document.querySelector('#sign_up_form').append(band_info_input);


  insert_line_into_HTML("#sign_up_form");

  const label = document.createElement('label');
  label.innerHTML = "Genre";
  document.querySelector('#sign_up_form').append(label);

  const select_genres = document.createElement('select');
  select_genres.setAttribute("name", "band_genre");
  select_genres.setAttribute("class", "form-control");

  genres.forEach(function(genre, index, array) {
    const option_genre = document.createElement('option');
    option_genre.setAttribute("value", genre);
    option_genre.innerHTML = genre;
    select_genres.append(option_genre);
  })
  document.querySelector('#sign_up_form').append(select_genres);
  insert_line_into_HTML("#sign_up_form");
  insert_line_into_HTML("#sign_up_form");


  const band_img_lbl = document.createElement('label');
  band_img_lbl.innerHTML = "Band image";
  document.querySelector('#sign_up_form').append(band_img_lbl);

  insert_line_into_HTML("#sign_up_form");

  const band_img = document.createElement('input');
  band_img.setAttribute("type", "file");
  band_img.setAttribute("id", "band_img");
  band_img.setAttribute("name", "band_img");
  band_img.setAttribute("onchange", "loadImg(event, 'band_img_to_show')");
  document.querySelector('#sign_up_form').append(band_img);

  insert_line_into_HTML("#sign_up_form");
  insert_line_into_HTML("#sign_up_form");

  const band_img_to_show = document.createElement('img');
  band_img_to_show.setAttribute("id", "band_img_to_show");
  band_img_to_show.setAttribute("width", "200");
  document.querySelector('#sign_up_form').append(band_img_to_show);

  insert_line_into_HTML("#sign_up_form");
  insert_line_into_HTML("#sign_up_form");

  const band_logo_lbl = document.createElement('label');
  band_logo_lbl.innerHTML = "Band logo";
  document.querySelector('#sign_up_form').append(band_logo_lbl);

  insert_line_into_HTML("#sign_up_form");

  const band_logo = document.createElement('input');
  band_logo.setAttribute("type", "file");
  band_logo.setAttribute("id", "band_logo");
  band_logo.setAttribute("name", "band_logo");
  band_logo.setAttribute("onchange", "loadImg(event, 'band_logo_to_show')");
  document.querySelector('#sign_up_form').append(band_logo);

  insert_line_into_HTML("#sign_up_form");
  insert_line_into_HTML("#sign_up_form");

  const band_logo_to_show = document.createElement('img');
  band_logo_to_show.setAttribute("id", "band_logo_to_show");
  band_logo_to_show.setAttribute("width", "200");
  document.querySelector('#sign_up_form').append(band_logo_to_show);

  insert_line_into_HTML("#sign_up_form");
  insert_line_into_HTML("#sign_up_form");


  const song_url1_lbl = document.createElement('label');
  song_url1_lbl.innerHTML = "URL song 1";
  document.querySelector('#sign_up_form').append(song_url1_lbl);

  const song_url1_input = document.createElement('input');
  song_url1_input.setAttribute("class", "form-control");
  song_url1_input.setAttribute("type", "text");
  song_url1_input.setAttribute("autofocus", null);
  song_url1_input.setAttribute("autocomplete", "off");
  song_url1_input.setAttribute("name", "song_1");
  song_url1_input.setAttribute("placeholder", "URL song 1");
  song_url1_input.setAttribute("id", "song_1");
  document.querySelector('#sign_up_form').append(song_url1_input);

  insert_line_into_HTML("#sign_up_form");

  const song_url2_lbl = document.createElement('label');
  song_url2_lbl.innerHTML = "URL song 2";
  document.querySelector('#sign_up_form').append(song_url2_lbl);

  const song_url2_input = document.createElement('input');
  song_url2_input.setAttribute("class", "form-control");
  song_url2_input.setAttribute("type", "text");
  song_url2_input.setAttribute("autofocus", null);
  song_url2_input.setAttribute("autocomplete", "off");
  song_url2_input.setAttribute("name", "song_2");
  song_url2_input.setAttribute("placeholder", "URL song 2");
  song_url2_input.setAttribute("id", "song_2");
  document.querySelector('#sign_up_form').append(song_url2_input);

  insert_line_into_HTML("#sign_up_form");

  const song_url3_lbl = document.createElement('label');
  song_url3_lbl.innerHTML = "URL song 3";
  document.querySelector('#sign_up_form').append(song_url3_lbl);

  const song_url3_input = document.createElement('input');
  song_url3_input.setAttribute("class", "form-control");
  song_url3_input.setAttribute("type", "text");
  song_url3_input.setAttribute("autofocus", null);
  song_url3_input.setAttribute("autocomplete", "off");
  song_url3_input.setAttribute("name", "song_3");
  song_url3_input.setAttribute("placeholder", "URL song 3");
  song_url3_input.setAttribute("id", "song_3");
  document.querySelector('#sign_up_form').append(song_url3_input);

  insert_line_into_HTML("#sign_up_form");
}

function show_owner_signUp_form(){
  insert_line_into_HTML("#sign_up_form");

  const place_name_lbl = document.createElement('label');
  place_name_lbl.innerHTML = "Place name";
  document.querySelector('#sign_up_form').append(place_name_lbl);

  const place_name_input = document.createElement('input');
  place_name_input.setAttribute("class", "form-control");
  place_name_input.setAttribute("type", "text");
  place_name_input.setAttribute("autofocus", null);
  place_name_input.setAttribute("autocomplete", "off");
  place_name_input.setAttribute("name", "place_name");
  place_name_input.setAttribute("placeholder", "Place name");
  place_name_input.setAttribute("id", "place_name");
  document.querySelector('#sign_up_form').append(place_name_input);

  insert_line_into_HTML("#sign_up_form");

  const place_img_lbl = document.createElement('label');
  place_img_lbl.innerHTML = "Place image";
  document.querySelector('#sign_up_form').append(place_img_lbl);

  insert_line_into_HTML("#sign_up_form");

  const place_img = document.createElement('input');
  place_img.setAttribute("type", "file");
  place_img.setAttribute("id", "place_img");
  place_img.setAttribute("name", "place_img");
  place_img.setAttribute("onchange", "loadImg(event, 'place_img_to_show')");
  document.querySelector('#sign_up_form').append(place_img);

  insert_line_into_HTML("#sign_up_form");
  insert_line_into_HTML("#sign_up_form");

  const place_img_to_show = document.createElement('img');
  place_img_to_show.setAttribute("id", "place_img_to_show");
  place_img_to_show.setAttribute("width", "200");
  document.querySelector('#sign_up_form').append(place_img_to_show);

  insert_line_into_HTML("#sign_up_form");
  insert_line_into_HTML("#sign_up_form");

  const place_location_lbl = document.createElement('label');
  place_location_lbl.innerHTML = "Place location";
  document.querySelector('#sign_up_form').append(place_location_lbl);

  const place_location_input = document.createElement('textarea');
  place_location_input.setAttribute("class", "form-control");
  place_location_input.setAttribute("type", "text");
  place_location_input.setAttribute("rows", "4");
  place_location_input.setAttribute("name", "place_location");
  place_location_input.setAttribute("placeholder", "Place location");
  place_location_input.setAttribute("id", "place_location");
  document.querySelector('#sign_up_form').append(place_location_input);

  insert_line_into_HTML("#sign_up_form");
}

document.addEventListener('DOMContentLoaded', function() {
  try{
    const submit = document.querySelector('#sign_up_btn');
    submit.disabled = true;
  
  document.querySelector('#role_sign_up').onchange = function() { 
    localStorage.setItem("files", 0);
    submit.disabled = true;
    clear_signUp_form();
    
      if(this.value === "Fan"){

        fetch('/rockermind/get_genres')
        .then(response => response.json())
        .then(data => {

          show_fan_signUp_form(data.genres);
          document.removeEventListener('keyup', check_fields_rockstar_sign_up); 
          document.removeEventListener('keyup', check_fields_owner_sign_up);
          document.addEventListener('keyup', check_fields_fan_sign_up); 
        });
      }

      else if(this.value === "Rockstar"){   

        fetch('/rockermind/get_genres')
        .then(response => response.json())
        .then(data => {

          show_rockstar_signUp_form(data.genres);
          document.removeEventListener('keyup', check_fields_fan_sign_up);
          document.removeEventListener('keyup', check_fields_owner_sign_up); 
          document.addEventListener('keyup', check_fields_rockstar_sign_up); 
        });        
      }

      else if(this.value === "Owner"){
        show_owner_signUp_form();
        document.removeEventListener('keyup', check_fields_fan_sign_up); 
        document.removeEventListener('keyup', check_fields_rockstar_sign_up);
        document.addEventListener('keyup', check_fields_owner_sign_up); 
      }


  }
}catch{}
});