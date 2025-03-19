const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const port = process.env.PORT || 5500;
const path = require('path'); // Helps with file paths
const cookieparser = require('cookie-parser');
app.use(cookieparser());
// // Middleware 1
// // that the Error handling middleware works
// app.get('/hello/', (req, res) => {
//     if (req.query.id == undefined) { // req.query.id  -> Means id is the parameters that should sent!
//         req.myError = { reason: "You should provide id!", isClient: true };
//         throw Error();
//     }
//     if (req.query.index == undefined) { // req.query.index  -> Means index is the parameters that should sent!
//         req.myError = { reason: "You should provide index!", isClient: true };
//         throw Error();
//     }

//     res.send("hello");
// });

// // Error handling middleware
// // This captures all kind of errors
// app.use(function (err, req, res, next) {
//     if (req.myError.isClient) {
//         res.status(400).send(req.myError.reason);
//     }
//     else {
//         res.status(500).send(req.myError.reason);
//     }
// });

// // Middleware 2


// //   This Middleware will handle EVERY Request that our server receives
// app.use(function (req, res, next) {
//     console.log(`received Request: ${req.method} , ${req.url}`);
//     next(); // <------------------------ WE MUST CALL next() in every middleware
// });
// app.use(function (req, res, next) {
//     console.log(`Middleware 2: ${req.method} , ${req.url}`);
//     next(); // <------------------------ WE MUST CALL next() in every middleware
// });

// app.use(function (req, res, next) {
//     console.log(`Middleware 3: ${req.ip} , ${req.query.index}`);
//     next(); // <------------------------ WE MUST CALL next() in every middleware
// });

// app.get('/hello', (req, res) => {
//     res.send("hello");
// });


// // // Middleware 3

// app.use('/auth', function (req, res, next) { // <--------------------------------- Classified path to check it user is logeed in
//     console.log(`received Request for /site2: ${req.method} , ${req.url}`);
//     next();
// });

// app.get('/auth/reports', (req, res) => {
//     res.send("Secret reports");
// });

// app.get('/auth/emolyessData', (req, res) => {
//     res.send("Secret employees data");
// });


// app.get('/stamData', (req, res) => {
//     res.send("Secret employees data");
// });




// Headers & Cokies 
// One Header
// app.get('/hello', (req, res) => {
//     res.header('some-header-name-I-like', 'hello');
//     res.send();
// });

// // Two Headers

// app.get('/hello', (req, res) => {
//     // res.set({field : value, field : value, ...})
//     //  We can use Express's set method to set response headers 
//     res.set({
//         'Content-Type': 'text/html',
//         // 'Content-Length': '95' // obviously not correct (it is 20) <---------- If egnored express() add it automaticly
//     })
//         // you MUST use end (do NOT use send)
//         //  otherwise, Express is going to override your headers
//         //   try it with send and you will see the the 'Content-Length'
//         //    will be changed 
//         .end("<h1>hello world</h1>");
// });



// // Another way to set the type of the content
// // the following code will set it to 
// // text/html; charset=utf-8
// // app.get('/hello', (req, res) => {
// //     res.type('.html').send();
// // })
// // And this code will set the type to
// // image/png
// app.get('/hello', (req, res) => {
//     res.type('.png').download('./files/tree.png');
// })


// // Reading headers that client send to us

// app.get('/hello', function (req, res) {
//     // Prints all the headers and their values
//     console.log(req.headers);
//     // Print the value of header 'my_header'
//     console.log(req.headers['user-agent']); // <----------------- Who send the http get - Chrome/android/ios/edge
//     res.send();
// });
const flights = {
    'TLV-EWR': 300,
    'TLV-CDG': 45,
    'TLV-LHR': 30,
    'TLV-VIE': 50,

}
// // Coockies - Text with key & value
// app.get('/hello', (req, res) => {
//     let count = (req.cookies && parseInt(req.cookies.myCookie) + 1) || 0;
//     res.cookie('myCookie', count);
//     res.send(`You have been here ${count} times`)
// });


app.get('/flights', (req, res) => {
    let currentTime = new Date();
    let currentTimeFormatted = currentTime.toTimeString().split(' ')[0];
    res.cookie('myCookie', currentTimeFormatted);
    res.send(`The last time you visit was at ${currentTimeFormatted}`);


});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
