const unathorizedView = document.getElementById('unauthorized');

const athorizedView = document.getElementById('authorized');

const logoutButton = document.getElementById('logout');

const loginButton = document.getElementById('login');

const deleteButton = document.getElementById('delete');

function checkCookie() {
    fetch('/cookie', {
        method: 'GET'
    }).then(res => res.text())
        .then(data => {
            if (data) {
                athorizedView.style.visibility = 'visible';

                unathorizedView.style.visibility = 'hidden';
            } else {
                unathorizedView.style.visibility = 'visible';

                athorizedView.style.visibility = 'hidden';
            }
        });
}

document.addEventListener('DOMContentLoaded', checkCookie);

logoutButton.addEventListener('click', (ev) => {
    fetch('/logout', {
        method: 'POST'
    }).then(res => res.text())
        .then(window.location.href = '/');
});

deleteButton.addEventListener('click', (ev) => {
    fetch('/delete', {
        method: 'DELETE'
    }).then(res => res.text())
        .then(window.location.href = '/');
});

loginButton.addEventListener('', checkCookie());