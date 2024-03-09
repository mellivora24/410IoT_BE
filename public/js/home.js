const led_1 = document.getElementById('led_1');
const led_2 = document.getElementById('led_2');
const led_3 = document.getElementById('led_3');

var led_bath;
var led_wc;

const fan_1 = document.getElementById('fan_1');
const fan_2 = document.getElementById('fan_2');

const in_room = document.getElementById('in');
const out_room = document.getElementById('out');
const in_room_ele = document.getElementById('1');
const out_room_ele = document.getElementById('2');

in_room.addEventListener('click', hide_show_in);
out_room.addEventListener('click', hide_show_out);

function hide_show_out() {
    if (in_room_ele.style.display === "") {
        in_room_ele.style.display = "none";
        out_room_ele.style.display = "";
        in_room.classList.remove('change-map-onchange');
        in_room.classList.add('change-map-btn');
        out_room.classList.remove('change-map-btn');
        out_room.classList.add('change-map-onchange');
    }
}
function hide_show_in() {
    if (out_room_ele.style.display === "") {
        in_room_ele.style.display = "";
        out_room_ele.style.display = "none";
        out_room.classList.remove('change-map-onchange');
        out_room.classList.add('change-map-btn');
        in_room.classList.remove('change-map-btn');
        in_room.classList.add('change-map-onchange');
    }
}

function change_state(object) {
    if (object === 'led_bath' || object === 'led_wc') {
        led_bath = document.getElementById('bath_room_led');
        led_wc = document.getElementById('toilet_room_led');
    }
    if (window[object].classList.contains('on-off-btn-1')) {
        window[object].classList.remove('on-off-btn-1');
        window[object].classList.add('on-off-btn-2');
    } else if (window[object].classList.contains('on-off-btn-2')) {
        window[object].classList.remove('on-off-btn-2');
        window[object].classList.add('on-off-btn-1');
    }
}
