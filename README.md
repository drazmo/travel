# Geebers Travel App
Guillermo Pedraza for Udacity

Allows user to enter a destination and travel start and end dates. Server will then display the forecasted weather if available. Only 16 days are available from WeatherBit.  It returns city information provided by GeoNames. Finally, three photos of the destination provided by PixaBay are displayed. 

Additional Features:
   * Allows user to add end date to trip
   * Adds images from Pixabay
   * Pulls forcast for multiple days
   * Incorporates icons into forecast

## Setting up
Add API Keys to .env file for GeoNames, WeatherBit and Pixabay.

GEONAMES_USER=<USER_NAME>  
WEATHER_BIT_API=<API_KEY>  
PIXBAY=<API_KEY>  

To install support:
- `npm install`

## Getting started

To start local web server project:
- `npm start`

## To run dev server, remember this just runs client with hot-reload. To get responses make sure local web server is running.

- `npm run build-dev`

## To run prod server - Build prod files and then start server

- `npm run build-prod`
- `npm start`


## To run unit tests using jest

- `npm test`

## References
Main Photo by  [Matt Howard](https://unsplash.com/@thematthoward?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)