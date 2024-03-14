function login(event) {

    event.preventDefault();

    var email_inp = document.getElementById('email-phone');
    var password_inp = document.getElementById('password');

    const email = email_inp.value;
    const password = password_inp.value;

    if (email != null && password != null) {
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
                const pass = data.passkey;
                window.location.href = `home?p=${pass}`;
            } else {
                if (email_inp.classList.contains('email-phone')) {
                    email_inp.classList.remove('email-phone');
                    password_inp.classList.remove('password');
                    email_inp.classList.add('email-phone-wrong');
                    password_inp.classList.add('password-wrong');
                }
                alert(data.message);
            }
        })
        .catch(error => {
            console.log(error);
        });
    } else alert("Vui lòng điền thông tin!");
}

document.querySelector('form').addEventListener('submit', login);
