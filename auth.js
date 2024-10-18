// Function to handle logout
function logout() {
    fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            sessionStorage.removeItem('loggedIn');
            sessionStorage.removeItem('username');
            const auth2 = gapi.auth2.getAuthInstance();
            if (auth2 != null) {
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
            }
            document.getElementById('login-section').classList.remove('hidden');
            document.getElementById('main-content').classList.add('hidden');
            document.getElementById('main-nav').classList.add('hidden');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to check if user is logged in
function isLoggedIn() {
    return fetch('http://localhost:3000/api/user', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn) {
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('username', data.userName);
            return true;
        }
        return false;
    })
    .catch(error => {
        console.error('Error:', error);
        return false;
    });
}

// Google Sign-In
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    
    fetch('http://localhost:3000/api/google-signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: id_token }),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('username', data.userName);
            document.getElementById('login-section').classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            document.getElementById('main-nav').classList.remove('hidden');
        } else {
            console.error('Google Sign-In failed:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Initialize Google Sign-In
function initGoogleSignIn() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
        }).then(function() {
            gapi.signin2.render('google-signin-button', {
                'scope': 'profile email',
                'width': 240,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': onSignIn,
                'onfailure': function(error) {
                    console.log(error);
                }
            });
        });
    });
}

// Call initGoogleSignIn when the page loads
document.addEventListener('DOMContentLoaded', initGoogleSignIn);