// code created by Quyet Thanh

const led_1 = document.getElementById('led_1');
const led_2 = document.getElementById('led_2');
const led_3 = document.getElementById('led_3');

var led_bath = document.getElementById('bath_room_led');
var led_wc = document.getElementById('toilet_room_led');

const fan_1 = document.getElementById('fan_1');
const fan_2 = document.getElementById('fan_2');

const in_room = document.getElementById('in');
const out_room = document.getElementById('out');
const in_room_ele = document.getElementById('1');
const out_room_ele = document.getElementById('2');

let updateKey = 'secret';

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

async function change_state(object) {
    let led_bath, led_wc;

    if (object === 'led_bath' || object === 'led_wc') {
        led_bath = document.getElementById('bath_room_led');
        led_wc = document.getElementById('toilet_room_led');
    }

    try {
        const url = `${window.location.protocol}//${window.location.host}/change`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: object,
                state: window[object].classList.contains('on-off-btn-1') ? false : true,
                key: updateKey
            })
        });

        const data = await response.json();

        if (data.success === true) {
            if (window[object].classList.contains('on-off-btn-1')) {
                window[object].classList.remove('on-off-btn-1');
                window[object].classList.add('on-off-btn-2');
            } else if (window[object].classList.contains('on-off-btn-2')) {
                window[object].classList.remove('on-off-btn-2');
                window[object].classList.add('on-off-btn-1');
            }
        } else {
            console.error('Lỗi:', data.error);
        }
    } catch (error) {
        console.error('Lỗi:', error);
    }
}


function init_app() {
    const url = window.location.protocol + '//' + window.location.host + '/state';
    fetch(url)
        .then( response => response.json())
        .then( data => {
            data.stateArr.forEach(devices => {
                if (devices.state === true) {
                    window[devices.name].classList.add('on-off-btn-1');
                } else window[devices.name].classList.add('on-off-btn-2');
            });
            updateKey = data.updateKey;
        })
        .catch( error => {
            alert("Đã xảy ra lỗi, liên hệ Thành đi!");
        });
}

window.onload = function() {
    init_app();
}
