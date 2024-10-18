// Function to initialize the application
function initApp() {
    isLoggedIn().then(loggedIn => {
        if (loggedIn) {
            document.getElementById('login-section').classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            document.getElementById('main-nav').classList.remove('hidden');
        } else {
            document.getElementById('login-section').classList.remove('hidden');
            document.getElementById('main-content').classList.add('hidden');
            document.getElementById('main-nav').classList.add('hidden');
        }
    });
}

// Call initApp when the page loads
document.addEventListener('DOMContentLoaded', initApp);

// Add event listeners for navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        document.querySelectorAll('main > section').forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
    });
});

// Google Sign-In button click handler
document.getElementById('google-signin-button').addEventListener('click', function() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(function(googleUser) {
        onSignIn(googleUser);
    }).catch(function(error) {
        console.log(error);
    });
});