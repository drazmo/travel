var path = require('path')
var https = require('follow-redirects').https;
var fs = require('fs');
var dateUtils = require("./dateUtils");
var cityPhotos = {}
var cityData = {};

const express = require('express')
const bodyParser = require('body-parser');
const querystring = require('querystring');
const cors = require('cors');
const dotenv = require('dotenv');
const mockAPIResponse = require('./mockAPI.js');
const fetch = require('node-fetch');
const app = express();

dotenv.config();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../dist')));

console.log("Working directory: " + __dirname);
console.log("Static directory: " + path.join(__dirname, '../../dist'));

app.get('/', function(req, res) {
    res.sendFile('../../dist/index.html', { root: __dirname + '/..' })
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Travel app listening on port 8081!')
})

app.get('/test', function(req, res) {
    res.send(mockAPIResponse);
})

app.post('/city', async function(req, res) {
    let result = await getCityInfo(req.body.city);

    if (result === null) {
        return res.statusCode(401).json({ code: 401, error: true, errorMsg: 'Could not communicate with Geonames server.' })
    }

    res.json({ code: 200, data: result });
});

app.post('/forecast', async function(req, res) {
    let result = await getCityForecast(req.body.city, new Date(req.body.startDate), new Date(req.body.endDate));

    if (result === null) {
        return res.statusCode(401).json({ code: 401, error: true, errorMsg: 'Could not communicate with Weather bit server.' })
    }

    res.json({ code: 200, data: result });
});

app.post('/photos', async function(req, res) {
    let result = await getCityPhotos(req.body.city);

    if (result === null) {
        return res.statusCode(401).json({ code: 401, error: true, errorMsg: 'Could not communicate with photos pixabay server.' })
    }

    res.json({ code: 200, data: result });
});

async function getCityInfo(city) {
    const model = 'general';
    const lang = 'en';

    const query = querystring.escape(city)
    console.log('City Search = ' + query);

    if (query in cityData) {
        console.log("Using cached city data.");
        return cityData[query];
    }

    try {
        //example call: http://api.geonames.org/searchJSON?q=london&maxRows=10&username=drazmo
        let response = await fetch(`http://api.geonames.org/searchJSON?q=${query}&maxRows=10&username=${process.env.GEONAMES_USER}`, {
            method: "post",
            headers: { 'Accept': 'application/json' }
        });

        if (response.status !== 200) throw new Error('Error detected communicating with geo names.');

        cityData[query] = response.json();
        return cityData[query];
    } catch (e) {
        console.log("Error processing text.", e)
        return null;
    }
}

async function getCityForecast(city, startDate, endDate) {
    const model = 'general';
    const lang = 'en';

    const query = querystring.escape(city)
    console.log('City Forecast Search = ' + query);

    try {
        //example call: https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
        let response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?units=I&city=${city}&key=${process.env.WEATHER_BIT_API}`, {
            method: "post",
            headers: { 'Accept': 'application/json' }
        });

        if (response.status !== 200) throw new Error('Error detected communicating with weather bit cloud.');

        dates = []
        lastDate = false
        nextDate = dateUtils.addDays(startDate, -1)

        while (dateUtils.formatDate(nextDate) != dateUtils.formatDate(endDate)) {
            nextDate = dateUtils.addDays(nextDate, 1);
            dates.push(dateUtils.formatDate(nextDate));
        }

        response = await response.json();
        data = response.data.filter((item) => dates.includes(item.valid_date));
        response.data = data;

        return response
    } catch (e) {
        console.log("Error processing text.", e)
        return null;
    }
}

async function getCityPhotos(city) {
    const query = querystring.escape(city)


    if (query in cityPhotos) {
        console.log("Using cached city photos data.");
        return cityPhotos[query];
    }

    try {
        let response = await fetch(`https://pixabay.com/api/?key=${process.env.PIXBAY}&q=${query}&image_type=photo&pretty=true`, {
            method: "get",
            headers: { 'Accept': 'application/json' }
        });

        if (response.status !== 200) throw new Error('Error detected communicating with pixabay.');

        cityPhotos[query] = response.json();
        return cityPhotos[query];
    } catch (e) {
        console.log("Error processing text.", e)
        return null;
    }
}