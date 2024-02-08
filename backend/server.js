const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});