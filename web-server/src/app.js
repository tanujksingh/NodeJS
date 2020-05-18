const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const chalk = require('chalk');

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const app = express();

//setup handlebars
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name: 'Tanuj'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name: 'Tanuj'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        mesg : 'Need some Help',
        title : 'Help',
        name: 'Tanuj'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            'error': 'Address must be provided'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if(error){
            res.send({'error': error});
        }else{
            forecast(latitude, longitude, (error, {description, temp, feelslike}) => {
                if(error){
                    res.send({'error': error});
                }else{
                    let forecast = 'The weather out here in ' + place + ' is ' + description
                    + '. The temperature is ' + temp + ' degrees'
                    + ' but feels like ' + feelslike + ' degrees';
                    res.send({
                        location: place,
                        address : req.query.address,
                        forecast: forecast
                    });
                }
            });
        }    
    });

    // res.send({
    //     weather : 'hyderabad',
    //     title : 'Weather App',
    //     address : req.query.address,
    //     temperature: temperature
    // });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({'error' : 'Search term must be provided'});
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('errorpage', {
        errorMsg : "Help article not found",
        title : '',
        name: 'Tanuj'
    });
});

app.get('*', (req, res) => {
    res.render('errorpage', {
        errorMsg : "My 404 page!",
        title : '',
        name: 'Tanuj'
    });
});

app.listen(3000, () => {
    console.log("Server started at port 3000!");
});

