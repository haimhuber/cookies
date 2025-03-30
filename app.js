const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const port = process.env.PORT || 5500;
const path = require('path'); // Helps with file paths
const cookieparser = require('cookie-parser');
app.use(cookieparser('myseceret'));
// // Middleware 1
app.use((req, res, next) => {
    if (req.cookies.isActive && (req.cookies.isActive > req.cookies.isActive + (2 * 60 * 1000))) {
        res.cookie('isActive', Date.now()); // Create another cookie
        console.log("Cookie");

    } else {
        res.clearCookie('isActive');
    }

    next(); // This is the most important state! it that is missing the server will stuck here!!
});

// // Middleware 2 - Path to - P1 / P2
app.use((req, res, next) => {
    const cookieConfig1 = {
        // do not allow accessing cookie in client side js
        // (using document.cookie)
        //httpOnly: true,
        //secure: true, // send only over https 
        // ttl in seconds (without this option the cookie will die 
        //    as soon as the browser is closed)
        maxAge: (1 * 60) * 1000, // Max age = 1 minute
        // signed: true,// if we use secret with cookieParser
        // for which routes should the browser send the cookie
        path: '/p1', // This cookie will create only to this path
        // SameSite: 'Lax'
    };
    res.cookie('cookieForPath_P1', 'p1Cookie', cookieConfig1);
    console.log("You just created cookie -> P1");

    next();
});

// 1)
app.get('/hello', (req, res) => {
    res.send('Hello!');
});

// 2)
app.get('/home', (req, res) => {
    if (req.cookies.hasBeenHere) { // Check if cookie already created
        res.json({ "Cookie": req.cookies.hasBeenHere });
    } else { // Creating new cookie
        res.cookie('hasBeenHere', new Date().toLocaleTimeString());
        res.json({ message: "Cookie has been set!" });
    }
});

// 3)
app.get('/login', (req, res) => {
    if (!req.cookies.isActive) {
        res.cookie('isActive', Date.now());
        res.json({ "You just created new cookie": req.cookies.isActive });

    } else {
        res.cookie('isActive', Date.now());
        res.json({ "You just created cookie": req.cookies.isActive });
    }
});

// 4)
app.get('/temp', (req, res) => {
    const cookieConfig1 = {
        // do not allow accessing cookie in client side js
        // (using document.cookie)
        //httpOnly: true,
        //secure: true, // send only over https 
        // ttl in seconds (without this option the cookie will die 
        //    as soon as the browser is closed)
        maxAge: (0.1 * 60) * 1000
        // signed: true,// if we use secret with cookieParser
        // for which routes should the browser send the cookie
        // path: '/',
        // SameSite: 'Lax'
    };
    res.cookie('mycookiesigned', 'val3', cookieConfig1);
    res.send("Hello");
});

// 5)
app.get('/p1', (req, res) => {
    res.json({ "Cookie created!": req.cookies.cookieForPath_P1 });
});

app.get('/p2', (req, res) => {
    res.json({ "Cookie not created!": false });
});


// 6)
app.get('/getSecretCookie', (req, res) => {
    const cookieConfig1 = {
        // do not allow accessing cookie in client side js
        // (using document.cookie)
        //httpOnly: true,
        //secure: true, // send only over https 
        // ttl in seconds (without this option the cookie will die 
        //    as soon as the browser is closed)
        //maxAge: (0.1 * 60) * 1000
        signed: true,// if we use secret with cookieParser
        // for which routes should the browser send the cookie
        // path: '/',
        // SameSite: 'Lax'
    };
    res.cookie('mycookiesigned', 'singedCoockie', cookieConfig1);
    res.send({ "You created signed cookie": req.signedCookies.mycookiesigned });

});

app.get('/sendSecretCookie', (req, res) => {
    if (req.signedCookies.mycookiesigned) {
        res.json({ "Singed Cookie": req.signedCookies.mycookiesigned });
    } else {
        res.send("Don't mess with my cookie!");
    }

});


// Server listner port 
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
