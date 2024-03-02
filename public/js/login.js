function login(event) {

    event.preventDefault();

    var email = document.getElementById('email-phone').value;
    var password = document.getElementById('password').value;

    const pws = {
        Email: email,
        Password: password
    }

    const url = window.location.protocol + '//' + window.location.host + '/auth';

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pws)
    })
    .then( response => response.json())
    .then( data => {
        if (data.success) {
            const passkey = data.passkey;
            window.location.href = `home?p=${passkey}`;
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.log(error);
    });
}

document.querySelector('form').addEventListener('submit', login);
