function loadImg(event, location){
    var image = document.getElementById(location);
    image.src = URL.createObjectURL(event.target.files[0]);
}

function check_fields_post_form(){
    const submit = document.querySelector('#new_post_btn');
    const post_info = document.querySelector('#post_info');
    if (post_info.value.length > 0 && post_info.value.length <= 800) {
      submit.disabled = false;
    }else{
      submit.disabled = true;
    }
  }

function insert_line_into_HTML(element, mode){
    const line = document.createElement('br');
    if(mode === "TAG"){
        document.querySelector(element).append(line);
    }else if(mode === "ELEMENT"){
        element.append(line);
    }
  }

let counter = 1;
const quantity = 3;

document.addEventListener('DOMContentLoaded', function() {

    if(document.querySelectorAll('.notification').length > 0){
        document.querySelector('#notif_img').style.animationPlayState = 'running';
    }

    const submit = document.querySelector('#new_post_btn');
    submit.disabled = true;
    
    load();
    document.addEventListener('keyup', check_fields_post_form);
});


window.onscroll = () => {
    if (window.innerHeight + Math.ceil(window.scrollY) >= document.body.offsetHeight) {
        load();
        console.log("HERE");
    }
};

function load() {

    const start = counter;
    const end = start + quantity - 1;
    counter = end + 1;

    fetch(`/rockermind/get_band_posts?start=${start}&end=${end}`)
    .then(response => response.json())
    .then(data => {
        data.posts.forEach(add_post);
    })
};

function add_post(post){
    const band_post = document.createElement('div');
    band_post.className = 'post';

    const band_name = document.createElement('h5');
    band_name.innerHTML = post.band_name;

    const band_page = document.createElement('a');
    band_page.setAttribute("href", "/rockermind/band_page/"+post.band_id);
    band_page.setAttribute("class", "band_ref");
    band_page.append(band_name);
    band_post.append(band_page);

    const post_dateTime = document.createElement('span');
    post_dateTime.innerHTML = post.date + " " + post.time;
    band_post.append(post_dateTime);

    insert_line_into_HTML(band_post, "ELEMENT");
    insert_line_into_HTML(band_post, "ELEMENT");

    const post_info = document.createElement('p');
    post_info.innerHTML = post.post_info;
    band_post.append(post_info);
    insert_line_into_HTML(band_post, "ELEMENT");

    if(!!post.post_img){
        const post_img = document.createElement('img');
        post_img.setAttribute("src", "data:image/png;base64, "+post.post_img);
        post_img.setAttribute("width", "200");
        band_post.append(post_img);
        insert_line_into_HTML(band_post, "ELEMENT");
        insert_line_into_HTML(band_post, "ELEMENT");
    }
    
    const likes_reacts = document.createElement("div");

    const post_likes = document.createElement('label');
    post_likes.innerHTML = "Likes: " + post.likes;

    const likes_img = document.createElement('img');
    likes_img.setAttribute("src", "/static/rockermind/images/like.png");
    likes_img.setAttribute("alt", "Likes")
    likes_img.setAttribute("width", "16");
    likes_img.setAttribute("style", "margin-left: 5px");

    likes_reacts.append(post_likes);
    likes_reacts.append(likes_img);
    band_post.append(likes_reacts);


    const loves_reacts = document.createElement("div");

    const post_loves = document.createElement('label');
    post_loves.innerHTML = "Loves: " + post.loves;

    const loves_img = document.createElement('img');
    loves_img.setAttribute("src", "/static/rockermind/images/love.png");
    loves_img.setAttribute("alt", "Loves")
    loves_img.setAttribute("width", "16");
    loves_img.setAttribute("style", "margin-left: 5px");

    loves_reacts.append(post_loves);
    loves_reacts.append(loves_img);
    band_post.append(loves_reacts);

    document.querySelector('#posts').append(band_post);
}