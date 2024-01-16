const url = window.location.protocol + '//' + window.location.host + '/update';

let st_led_1 = true;
let st_led_2 = true;
let st_led_3 = true;
let st_led_bath = true;
let st_led_wc = true;
let st_fan_1 = true;
let st_fan_2 = true;

const led_1 = document.getElementById('led_1');
const led_2 = document.getElementById('led_2');
const led_3 = document.getElementById('led_3');
const led_bath = document.getElementById('bath_room_led');
const led_wc = document.getElementById('toilet_room_led');

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

function init() {
    
}

// function change(key, value) {
//     fetch (url, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             key: key,
//             value: value
//         })
//     })
//     .then (response => response.json())
//     .catch ( error => {
//         alert(error);
//     })
// }
// function change_st(key, value) {

// }
