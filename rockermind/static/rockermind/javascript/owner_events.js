function checFields_newEvent_form(){
    const new_event_btn = document.querySelector('#new_event_btn');
    const event_date = document.querySelector('#event_date');
    const event_cost = document.querySelector('#event_cost');
    const event_bands = document.querySelector('#event_bands');
    const event_info = document.querySelector('#event_info');
    
    if (event_date.value !== "" && event_cost.value !== "" && event_bands.value!=""
    && event_info.value.length > 0 && event_info.value.length <= 1024) {
        new_event_btn.disabled = false;
    }else{
        new_event_btn.disabled = true;
    }
  }

document.addEventListener('DOMContentLoaded', function() {

    if(document.querySelectorAll('.notification').length > 0){
        document.querySelector('#notif_img').style.animationPlayState = 'running';
    }else{
        document.querySelector('#notif_img').style.animationPlayState = 'paused';
    }
    
    const new_event_btn = document.querySelector('#new_event_btn');
    new_event_btn.disabled = true;

    document.addEventListener('keyup', checFields_newEvent_form); 
});