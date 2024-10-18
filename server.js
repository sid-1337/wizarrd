const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const session = require('express-session');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Replace with your Google Client ID
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

app.use(cors({
  origin: 'http://localhost:8080', // Replace with your frontend URL
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

async function verifyToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID
  });
  const payload = ticket.getPayload();
  return payload;
}

app.post('/api/google-signin', async (req, res) => {
  const { token } = req.body;
  try {
    const payload = await verifyToken(token);
    const userId = payload['sub'];
    const userName = payload['name'];
    const userEmail = payload['email'];

    // Here you would typically check if the user exists in your database
    // If not, you might want to create a new user record

    req.session.userId = userId;
    req.session.userName = userName;
    req.session.userEmail = userEmail;

    res.json({ success: true, userName, userEmail });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

app.get('/api/user', (req, res) => {
  if (req.session.userId) {
    res.json({ 
      loggedIn: true, 
      userName: req.session.userName, 
      userEmail: req.session.userEmail 
    });
  } else {
    res.json({ loggedIn: false });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ success: false, message: 'Error logging out' });
    } else {
      res.json({ success: true, message: 'Logged out successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});