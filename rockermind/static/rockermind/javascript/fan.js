var FLAG_LOAD_AT_END;

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
    fetch(`/rockermind/get_fan_posts?start=${start}&end=${end}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "X-CSRFToken": csrftoken },
    })
    .then(response => response.json())
    .then(data => {
        data.posts.forEach(add_post);
    }).then(() => {
        document.querySelectorAll('.react_btn').forEach(function(button) {
            button.onclick = function() {
                const method = button.dataset.method;
                const like_btn = button.parentNode.querySelector(".like").childNodes[0];
                const love_btn = button.parentNode.querySelector(".love").childNodes[0];
                console.log(like_btn);
                console.log(love_btn);
                if(button.childNodes[0].src.includes("not_")){
                    if(method === "like"){
                        like_btn.src = "/static/rockermind/images/like.png";
                        love_btn.src = "/static/rockermind/images/not_love.png";
                    }else if(method === "love"){
                        like_btn.src = "/static/rockermind/images/not_like.png";
                        love_btn.src = "/static/rockermind/images/love.png";
                    }
                }else{
                    if(method === "like"){
                        button.childNodes[0].src = "/static/rockermind/images/not_like.png";
                    }else if(method === "love"){
                        button.childNodes[0].src = "/static/rockermind/images/not_love.png";
                    }
                }

                let data = {
                    'post_id': button.dataset.post_id,
                    'method': method
                };
                let csrftoken = getCookie('csrftoken');
                fetch(`/rockermind/react_to_post`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { "X-CSRFToken": csrftoken },
                })
            }
        });
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
    

    const like_btn = document.createElement("button");
    like_btn.setAttribute("class", "react_btn like");
    like_btn.setAttribute("style", "margin-right: 10px; padding: 0; border: none; background: none; outline:none;");
    like_btn.setAttribute("data-method", "like");
    like_btn.setAttribute("data-post_id", post.id);

    const likes_img = document.createElement('img');
    if(post.fan_likes){
        likes_img.setAttribute("src", "/static/rockermind/images/like.png");
    }else{
        likes_img.setAttribute("src", "/static/rockermind/images/not_like.png");
    }
    likes_img.setAttribute("alt", "Likes")
    likes_img.setAttribute("width", "16");
    likes_img.setAttribute("style", "margin-left: 5px");

    like_btn.append(likes_img);
    band_post.append(like_btn);


    const love_btn = document.createElement("button");
    love_btn.setAttribute("class", "react_btn love");
    love_btn.setAttribute("style", "padding: 0; border: none; background: none; outline:none;");
    love_btn.setAttribute("data-method", "love");
    love_btn.setAttribute("data-post_id", post.id);

    const loves_img = document.createElement('img');
    if(post.fan_loves){
        loves_img.setAttribute("src", "/static/rockermind/images/love.png");
    }else{
        loves_img.setAttribute("src", "/static/rockermind/images/not_love.png");
    }
    loves_img.setAttribute("alt", "Loves")
    loves_img.setAttribute("width", "16");
    loves_img.setAttribute("style", "margin-left: 5px");

    love_btn.append(loves_img);
    band_post.append(love_btn);

    document.querySelector('#posts').append(band_post);
}

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