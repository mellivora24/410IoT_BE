function login(event) {

    event.preventDefault();

    var infor = document.getElementById('email-phone').value;
    var pass = document.getElementById('password').value;

    const pws = {
        infor: infor,
        auth: pass
    }

    console.log(pws)

    const url = window.location.protocol + '//' + window.location.host + '/auth';

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pws)
    })
    .then( response => response.json())
    .then( data => {
        if (data.success) {
            window.location.href = "home";
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.log(error);
    });
}

document.querySelector('form').addEventListener('submit', login);