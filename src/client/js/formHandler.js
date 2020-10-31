export async function handleSubmit(event) {
    event.preventDefault()
    console.log("::: Form Submitted :::")


    let updateCity = function(city) {
        document.getElementById("city").innerText = `City: ${city.name}, ${city.adminCode1}  ${city.countryCode} Population: ${city.population}`;
    };

    let updateWeather = function(weather) {
        let txt = '';
        for (let i = 0; i < 5; i++) {
            let forecast = weather.data[i];
            txt = txt + `<br> ${forecast.datetime} - high: ${forecast.max_temp} low: ${forecast.low_temp}`;
        }
        txt = `<div>${txt}</div>`;
        const name = "John";
        document.getElementById("weather").innerHTML = txt; // txt;
    };

    try {
        // check what text was put into the form field
        let formText = document.getElementById('name').value

        if (Client.checkForSentence(formText) === false) {
            throw new Error("Bad input");
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
            body: JSON.stringify({ city: formText })
        })

        res = await res.json();
        console.log("Forecast query response:" + JSON.stringify(res.data));
        updateWeather(res.data);
    } catch (e) {
        console.log("Error retriving city", e);
    }
}