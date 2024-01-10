//TODO
//search bar make event listener capture .val()
//search button add event listener
//fetch api from open weather or whatever for search query
//save cities searched for in buttons below search
//openweathermap.org---need to create an account for api key
//first need lat and longitude of city--use geocoding api
//second can use the lat/long to call 5 day/3 hour forecast has 5 days worth of a forecast each 3 hours
//we get one of the 3 hour forecasts and call it a day .split().pop()?
//https://api.openweathermap.org/geocoding?appid=859ytt99234r(api-key)
//grab long latitude from first api and give them var names
//use the weather data to gen the weather 
//determine how to grab data and write cards
//finish css to style page
//my api key === 6c31869795f0dd512d210bae2ff7b924

$(document).ready(function () {
    const today = dayjs();
    const btn = $('#btn');
    const cityInput = $('#city-name');
    const searchContainer = $('.search-container');

    async function getLocApi(requestUrl) {
        const response = await fetch(requestUrl)//   async await method
        const data = await response.json()
        console.log(data)
        var cityLat = data[0].lat;
        console.log(cityLat)
        var cityLon = data[0].lon
        console.log(cityLon)
        var weatherUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=6c31869795f0dd512d210bae2ff7b924';
        getWeatherApi(weatherUrl);
    };

    async function getWeatherApi(requestUrl) {
        const response = await fetch(requestUrl)//   async await method
        const data = await response.json()
        console.log(data)
    };

    btn.on('click', function () {
        console.log('ok')
        var inputVal = cityInput.val();     
        var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + inputVal + '&limit=5&appid=6c31869795f0dd512d210bae2ff7b924'
        getLocApi(requestUrl);
        
        }
    );
    
})