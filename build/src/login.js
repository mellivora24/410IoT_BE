var login_btn = document.getElementById('login-button');
login_btn.addEventListener('click', login)

function login() {
    var infor = document.getElementById('email-phone').value;
    var pass = document.getElementById('password').value;
    const url = window.location.protocol + '//' + window.location.host + '/auth';
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            infor: infor,
            auth: pass
        })
    })
    .then( response => response.json())
    .then( data => {
        if (data.success) {
            window.location.href = "home";
        } else {
            alert("Sai mật khẩu bạn ei!");
        }
    })
    .catch(error => {
        alert("Sai mật khẩu bạn ei!");
    });
}