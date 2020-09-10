localStorage.clear();
var FLAG_LOAD_AT_END;


if (!localStorage.getItem('bands')) {
  var initializer_array = [];
  localStorage.setItem("bands", JSON.stringify(initializer_array));
}

function save_band(band){
    var storedBands = JSON.parse(localStorage.getItem("bands"));
    storedBands.push(band.band_name);
    localStorage.setItem("bands", JSON.stringify(storedBands));
  }

function clear_post_container(){
    const form = document.getElementById("posts");
    while (form.firstChild) {
      form.removeChild(form.lastChild);
    }
  }

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function insert_line_into_HTML(element, mode){
    const line = document.createElement('br');
    if(mode === "TAG"){
        document.querySelector(element).append(line);
    }else if(mode === "ELEMENT"){
        element.append(line);
    }
  }

function stop_animation(){
    document.querySelector('#notif_img').style.animationPlayState = 'paused';
    document.querySelector('#notif_img').style.opacity = "1.0";
}


let counter = 1;

const quantity = 3;

document.addEventListener('DOMContentLoaded', function() {

    load();
    
    if(document.querySelectorAll('.notification').length > 0){
        document.querySelector('#notif_img').style.animationPlayState = 'running';
    }

    document.querySelector("#search_btn").onclick = function() {
        clear_post_container();
        FLAG_LOAD_AT_END=false;
        const band_to_search = document.querySelector("#band_to_search").value;

        let data = {
            'band_to_search': band_to_search,
        };
        let csrftoken = getCookie('csrftoken');
        fetch(`/rockermind/search_band`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "X-CSRFToken": csrftoken },
        })
        .then(response => response.json())
        .then(data => {
            data.bands.forEach(add_band);
            data.bands.forEach(save_band);
        })

        return false;
    }
});


window.onscroll = () => {
    if (window.innerHeight + Math.ceil(window.scrollY) >= document.body.offsetHeight && FLAG_LOAD_AT_END) {
        load();
    }
};

function load() {
    FLAG_LOAD_AT_END = true;
    const start = counter;
    const end = start + quantity - 1;
    counter = end + 1;

    var storedBands = JSON.parse(localStorage.getItem("bands"));

    let data = {
        'bands_save': storedBands,
    };
    let csrftoken = getCookie('csrftoken');
    fetch(`/rockermind/get_bands?start=${start}&end=${end}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "X-CSRFToken": csrftoken },
    })
    .then(response => response.json())
    .then(data => {
        data.bands.forEach(add_band);
        data.bands.forEach(save_band);
    })
};

function add_post(contents) {

    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = contents;

    document.querySelector('#posts').append(post);
};


function add_band(band){
    const band_post = document.createElement('div');
    band_post.className = 'post';

    const band_name = document.createElement('h5');
    band_name.innerHTML = band.band_name;

    const band_page = document.createElement('a');
    band_page.setAttribute("href", "/rockermind/band_page/"+band.band_id);
    band_page.setAttribute("class", "band_ref");
    band_page.append(band_name);
    band_post.append(band_page);

    const band_img = document.createElement('img');
    band_img.setAttribute("src", "data:image/png;base64, "+band.band_logo);
    band_img.setAttribute("width", "200");
    band_post.append(band_img);

    insert_line_into_HTML(band_post, "ELEMENT");
    insert_line_into_HTML(band_post, "ELEMENT");

    const band_genre = document.createElement('label');
    band_genre.innerHTML = "Main genre: "+band.band_genre;
    band_post.append(band_genre);

    document.querySelector('#posts').append(band_post);
}