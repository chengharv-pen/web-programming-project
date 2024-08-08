const express = require('express');
const fs = require('fs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// Set up storage for uploaded files
const multer = require('multer');
const uploadDir = path.join(__dirname, 'content/content-images');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create the multer instance
const upload = multer({ storage: storage });

// Serve static files in the 'Q4' directory
app.use(express.static(path.join(__dirname)));

// Middleware to parse json and url data
app.use(
    express.json(),
    express.urlencoded({
        extended: true,
    }));

app.use(cookieParser());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 } // 1 day
}));

// This code displays the contents tied to "./Q1.html"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Q4', 'index.html'));
});

// Redirect to another page if session user exists
app.post('/check-session', (req, res) => {
    if (req.session.user) {
        res.redirect('/content/give-away.html');
    } else {
        res.redirect('/content/login.html');
    }
});

// Whenever we post the form for find.html, we redirect to browse.html with the form's important parameters in the URL
app.post('/find-cat-or-dog-submit', (req, res) => {
    console.log('Find - Got request body:', req.body);
    res.redirect('/content/browse.html?animalType=' + req.body.animalType + '&age=' + req.body.age + '&gender=' + req.body.gender);
});

// POST request to check if a username is already taken.
app.post('/check-username', (req, res) => {
    const { username } = req.body;

    //Split on every new line, then for every line, split on ':' and take the first entry of the resulting array
    const users = fs.readFileSync('login.txt', 'utf8').split('\n').map(line => line.split(':')[0]);

    if (users.includes(username)) {
        res.json({ exists: true });
    } else {
        res.json({ exists: false });
    }
});

// POST request to create an account
app.post('/create-account', (req, res) => {
    const { username, password } = req.body;
    fs.appendFile('login.txt', `${username}:${password}\n`, (err) => {
        if (err) {
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});

// POST request that handles logins
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Split on every new line, then for every line, split on ':'
    const users = fs.readFileSync('login.txt', 'utf8').split('\n').map(line => line.split(':'));

    // If there is some username/password that fufills the conditions, then userExists is true.
    const userExists = users.some(([storedUsername, storedPassword]) =>
        storedUsername === username && storedPassword === password
    );

    // We need to start a session if the user login is successful.
    if (userExists) {
        req.session.user = { username }; // Store user information in session
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// POST request that destroys the current session, if user tries to log out.
app.post('/logout', (req, res) => {
    let user = null;
    if (req.session.user) {
        user = req.session.user.username;
    }

    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }

        if (user) {
            res.json({ message: 'Goodbye, ' + user });
        } else {
            res.json({ message: 'No user is logged in this session, but we logged out anyways.' });
        }
    });
});

// This POST request handles the give-away form submission
// The upload.single('file') function should be used as middleware in the route definition to properly handle the file upload before accessing the request body data.
app.post('/give-away-submit', upload.single('file'), (req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    let dataString = '';
    let users = fs.readFileSync('./content/available-pet-info.txt', 'utf-8').split('\n');

    console.log('Give-Away - Request Body:', req.body);
    console.log('Give-Away - Uploaded File:', req.file);

    // Creating the dataString
    const userID = users.length;
    const username = req.session.user.username;
    dataString = userID + ':' + username + ':';

    // Check if a file was uploaded
    if (!req.file) {
        res.write('No file uploaded! ');
        dataString += formatRequestBody(req.body, req.file);
    } else {
        dataString += formatRequestBodyFile(req.body, req.file);
    }

    dataString.slice(0, -1);

    fs.appendFile('./content/available-pet-info.txt', dataString + '\n', (err) => {
        if (err) {
            res.write('Error writing to file!');
            return res.end();
        }
        res.write('Form successfully submitted!');
        res.end();
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000. http://localhost:3000/');
});

// Common function to format request body
function formatRequestBodyCommon(requestBody, file) {
    const {
        animalType = '',
        breed = '',
        age = '',
        gender = '',
        alongDog = '',
        alongCat = '',
        suitableFamily = '',
        comment = '',
        name = '',
        email = '',
        petName = '',
    } = requestBody;

    return `${petName}:${file}:${animalType}:${breed}:${age}:${gender}:${alongDog}:${alongCat}:${suitableFamily}:${comment}:${name}:${email}`;
}

// Function to format request body with file
function formatRequestBodyFile(requestBody, requestFile) {
    return formatRequestBodyCommon(requestBody, requestFile.filename);
}

// Function to format request body without file
function formatRequestBody(requestBody) {
    return formatRequestBodyCommon(requestBody, '');
}