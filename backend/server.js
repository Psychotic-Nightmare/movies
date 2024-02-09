const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// AWS Configuration
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const cognito = new AWS.CognitoIdentityServiceProvider();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock data for movies
const movies = [
    // Add your movie data here
];

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/signup', (req, res) => {
    const { username, password, name, email } = req.body;

    const params = {
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: username,
        Password: password,
        UserAttributes: [
            {
                Name: 'name',
                Value: name
            },
            {
                Name: 'email',
                Value: email
            }
        ]
    };

    cognito.signUp(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        } else {
            res.send(data);
        }
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password
        }
    };

    cognito.initiateAuth(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        } else {
            res.send(data);
        }
    });
});

app.post('/confirm', (req, res) => {
    const { username, code } = req.body;

    const params = {
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: username,
        ConfirmationCode: code
    };

    cognito.confirmSignUp(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        } else {
            res.send(data);
        }
    });
});

app.post('/profile', (req, res) => {
    const { name, dob, favoriteMovie } = req.body;

    // Save the profile information in your database
    // This is just a mock, replace it with actual database operation
    console.log(`Profile information for ${name}: DOB - ${dob}, Favorite Movie - ${favoriteMovie}`);

    res.send({ status: 'Profile information saved successfully' });
});

app.get('/movies', (req, res) => {
    const TMDB_API_KEY = process.env.TMDB_API_KEY; // Access the API key from .env file

    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
        .then(response => {
            res.send(response.data.results);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error fetching movies');
        });
});
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });