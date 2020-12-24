export async function handleSubmit(event) {
    event.preventDefault()
    console.log("::: Form Submitted :::")

    let error = document.getElementById("error");
    error.style.display = 'none';
    document.getElementById("results").style.display = 'none';


    let updateCity = function(city) {
        document.getElementById("city").innerText = `City: ${city.name}, ${city.adminCode1}  ${city.countryCode} Population: ${city.population}`;
    };

    let updateWeather = function(weather, days) {
        let txt = '';

        if (weather.data.length === 0) {
            txt = "Weather data only available for the next 16 days. Come back and check when your trip is closer."
        } else {
            for (let i = 0; i < weather.data.length; i++) {
                let forecast = weather.data[i];
                txt = txt + `<br> ${forecast.datetime} - High: ${forecast.max_temp} Low: ${forecast.low_temp} ${forecast.weather.description}`;
                txt += `<img width="50" height="50" src="https://www.weatherbit.io/static/img/icons/${forecast.weather.icon}.png"/>`
            }

            if (weather.data.length < days) {
                txt += `<br><br><center> Weather data not available for your entire trip. </br>Weather data only available for 16 days from today.</center></br>`
            }
        }
        txt = `<div>${txt}</div>`;


        document.getElementById("weather").innerHTML = txt; // txt;
    };

    let updatePhotos = function(photos) {
        let txt = '';
        let maxPhotos = 3;

        if (photos.totalHits < maxPhotos) maxPhotos = photos.totalHits;

        for (let i = 0; i < maxPhotos; i++) {
            txt += `<div><img src="${photos.hits[i].previewURL}"/></div>`;
        }

        document.getElementById("photos").innerHTML = txt; // txt;
    }

    try {
        // check what text was put into the form field
        let formText = document.getElementById('name').value
        let formStartDate = document.getElementById('start-date').value
        let formEndDate = document.getElementById('end-date').value

        if (Client.checkForCity(formText) === false) {
            throw new Error("Please enter a valid destination");
        }

        if (formStartDate === null || formStartDate.length === 0) {
            throw new Error("Please enter a start date. Use format MM/DD/YYYY");
        }

        if (formEndDate === null || formEndDate.length === 0) {
            throw new Error("Please enter a end date. Use format MM/DD/YYYY");
        }

        if (Client.checkValidDate(formStartDate) === false) {
            throw new Error("Invalid start date. Use format MM/DD/YYYY");
        }

        if (Client.checkValidDate(formEndDate) === false) {
            throw new Error("Invalid end date. Use format MM/DD/YYYY");
        }

        var startDate = new Date(formStartDate);
        var endDate = new Date(formEndDate);

        var difference = endDate.getTime() - startDate.getTime();
        var days = Math.ceil(difference / (1000 * 3600 * 24));
        console.log("Trip will last: " + days + " day(s)");

        if (days < 0) {
            throw new Error("End date must be after start date.");
        }

        let res = await fetch('http://localhost:8081/city', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city: formText })
        })

        res = await res.json();
        console.log("City query response:" + JSON.stringify(res.data));
        updateCity(res.data.geonames[0]);

        res = await fetch('http://localhost:8081/forecast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city: formText, startDate: formStartDate, endDate: formEndDate })
        })

        res = await res.json();
        console.log("Forecast query response:" + JSON.stringify(res.data));
        updateWeather(res.data, days);


        res = await fetch('http://localhost:8081/photos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city: formText })
        })

        res = await res.json();
        console.log("Photos query response:" + JSON.stringify(res.data));
        updatePhotos(res.data);

        document.getElementById("results").style.display = 'flex';
    } catch (e) {
        console.log("Error retriving city", e);
        error.style.display = 'block';
        error.innerHTML = e;
    }
}