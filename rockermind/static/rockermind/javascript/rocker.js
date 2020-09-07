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

// Start with first post
let counter = 1;

// Load posts 20 at a time
const quantity = 20;

// When DOM loads, render the first 20 posts
document.addEventListener('DOMContentLoaded', function() {
    const submit = document.querySelector('#new_post_btn');
    submit.disabled = true;
    
    load();
    document.addEventListener('keyup', check_fields_post_form);
});


// If scrolled to bottom, load the next 20 posts
window.onscroll = () => {
    if (window.innerHeight + Math.ceil(window.scrollY) >= document.body.offsetHeight) {
        console.log("HERE");
        load();
    }
};

// Load next set of posts
function load() {

    // Set start and end post numbers, and update counter
    const start = counter;
    const end = start + quantity - 1;
    counter = end + 1;

    // Get new posts and add posts
    fetch(`/rockermind/posts?start=${start}&end=${end}`)
    .then(response => response.json())
    .then(data => {
        data.posts.forEach(add_post);
    })
};

// Add a new post with given contents to DOM
function add_post(contents) {

    // Create new post
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = contents;

    // Add post to DOM
    document.querySelector('#posts').append(post);
};