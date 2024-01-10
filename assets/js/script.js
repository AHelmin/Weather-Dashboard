//OFFIC HOUR QUESTIONS
//HOW DO I GET MY ROW TO FORM A COLUMN IN BOOTSTRAP
//WHY IS THE WEATHER DATA NOT GETTING FETCHED
//ASK ABOUT HOW TO USE MEMORY AND STORAGE, REALLY NEED SOME HELP HERE


//TODO
//search bar make event listener capture .val()--DONE
//search button add event listener--DONE BUT STILL NEED TO FINSIH ONCE I CAN ACCESS WEATHER DATA
//fetch api from open weather or whatever for search query--LOCATION DATA FETCHED, UNABLE TO FETCH WEATHER DATA
//save cities searched for in buttons below search
//openweathermap.org---need to create an account for api key--DONE
//first need lat and longitude of city--use geocoding api--DONE
//second can use the lat/long to call 5 day/3 hour forecast has 5 days worth of a forecast each 3 hours
//we get one of the 3 hour forecasts and call it a day .split().pop()?
//https://api.openweathermap.org/geocoding?appid=859ytt99234r(api-key)
//grab long latitude from first api and give them var names--DONE
//use the weather data to gen the weather 
//determine how to grab data and write cards
//finish css to style page
//my api key === 6c31869795f0dd512d210bae2ff7b924

$(document).ready(function () {
    const today = dayjs();
    const btn = $('#btn');
    const cityInput = $('#city-name');
    const searchContainer = $('.search-container');
    const searchHistory = $('#search-history');
    const currentDay = $('#current-day');
    let savedSearches = [
        {save: 1, city: ''},
        {save: 2, city: ''},
        {save: 3, city: ''},
        {save: 4, city: ''},
        {save: 5, city: ''},
        {save: 6, city: ''},
        {save: 7, city: ''},
        {save: 8, city: ''},
    ];

    // function updateSavedSearches(newSearch) {                 
    //     savedSearches = savedSearches.map( function(hourBlock) {
    //         if (hourBlock.hour !==newHourBlock.hour) return hourBlock
    //         hourBlock.message = newHourBlock.message
    //         return hourBlock
    //     })
    //     updateStorage();
    //     displayCalendar();
    //     }

    async function getLocApi(requestUrl) {
        const response = await fetch(requestUrl)//   async await method
        const data = await response.json()
        console.log(data)
        var cityLat = data[0].lat;
        console.log(cityLat)
        var cityLon = data[0].lon
        console.log(cityLon)
        var weatherUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=6c31869795f0dd512d210bae2ff7b924';
        console.log(weatherUrl)
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
        currentDay.children().eq(0).text(inputVal)
        var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + inputVal + '&limit=5&appid=6c31869795f0dd512d210bae2ff7b924'
        getLocApi(requestUrl);
        storeHistory();
        }
    );

    function storeHistory() {

    }
    
})