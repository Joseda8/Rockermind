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

document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll(".confirm_event_btn").forEach(function(button) {
        button.onclick = function() {
            let data = {
                'event_to_confirm': this.dataset.event,
            };
            let csrftoken = getCookie('csrftoken');
            fetch(`/rockermind/band_confirmed_event`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "X-CSRFToken": csrftoken },
            }).then(response => response.json())
            .then(data => {
                if(data==200){
                    location.reload()
                }
            })
        }
    });

});