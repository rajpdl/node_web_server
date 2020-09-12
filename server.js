const { timeStamp } = require('console');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${new Date().toString()} ${req.method} ${req.url}` ;
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error) {
            console.log('Error occurred.');
        }
    });
    console.log(log); 
    next();
});

// app.use((req, res, next) => {
//     res.render('maintain.hbs', {
//         title: 'Maintain Page',
//         message: 'You are redirected to the maintain page.'
//     });
// });

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
    // return 'test';
});

hbs.registerHelper('captalizeText', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title : 'Home Page',
        message: 'Welcome To Our Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Page'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact.hbs', {
        title: 'Contact',
        owner: 'Raj Pdl'
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});