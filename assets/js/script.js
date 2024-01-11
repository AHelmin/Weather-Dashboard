//OFFIC HOUR QUESTIONS
//how to 


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
    const cardContainer = $('#five-day');
    const cardBody = $('#card-body');
    let savedSearches = ['', '', '', '', '', '', '', ''];

    // function updateSavedSearches(newSearch) {                 
    //     savedSearches = savedSearches.map( function(hourBlock) {
    //         if (hourBlock.hour !==newHourBlock.hour) return hourBlock
    //         hourBlock.message = newHourBlock.message
    //         return hourBlock
    //     })
    //     updateStorage();
    //     displayCalendar();
    //     }


    function checkForSavedData() {
        const savedData = localStorage.getItem('savedSearches');
        if (savedData) {
            savedSearches = JSON.parse(savedData)
        }
        displaySearchHistory();
    };

    function displaySearchHistory() {
        for (var i = 0; i < savedSearches.length; i++) {
            console.log[savedSearches[i]]
            if (savedSearches[i] !== '') {
            searchHistory.append(`<button type="button" id="button">${savedSearches[i]}</button>`)
            }
        };
    };

    function updateSavedData() {
        savedSearches.unshift(cityInput.val());
        if (savedSearches.length > 8) {
            savedSearches.pop();
        }
        localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    };


    async function getLocApi(requestUrl) {
        const response = await fetch(requestUrl);//   async await method
        const data = await response.json();
        var cityLat = data[0].lat;
        var cityLon = data[0].lon
        var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=6c31869795f0dd512d210bae2ff7b924';
        await getWeatherApi(weatherUrl);
    };

    async function getWeatherApi(requestUrl) {
        const response = await fetch(requestUrl);//   async await method
        const data = await response.json();
        writeWeather(data);
    };

    function writeWeather(data) {
        var dateTime = data.list[2].dt_txt;
        var adjustedDate = dayjs(dateTime).format('M/D/YYYY')
        var cloudStatus = data.list[2].weather[0].main;
        var temp = data.list[2].main.temp;
        var tempF = (temp - 273.15) * 9 / 5 + 32;
        var humidity = data.list[2].main.humidity;
        var windSpeed = data.list[2].wind.speed;
        console.log(cloudStatus);
        var inputVal = cityInput.val();
        currentDay.children().eq(0).text(`${inputVal} (${adjustedDate})`);
        currentDay.children().eq(1).text(`Temp: ${tempF.toFixed(2)}°F`);
        currentDay.children().eq(2).text(`Wind: ${windSpeed} MPH`);
        currentDay.children().eq(3).text(`Humidity: ${humidity}%`);
        var j = 2;
        for (var i = 0; i < 5; i++) {
            var dateTime = data.list[j].dt_txt;
            var adjustedDate = dayjs(dateTime).format('M/D/YYYY')
            var cloudStatus = data.list[j].weather[0].main;
            var temp = data.list[j].main.temp;
            var tempF = (temp - 273.15) * 9 / 5 + 32;
            var humidity = data.list[j].main.humidity;
            var windSpeed = data.list[j].wind.speed;
            cardContainer.children().eq(i).children().eq(0).append(`<h5>${adjustedDate}</h5><p>Temp: ${tempF.toFixed(2)}°F</p><p>Wind: ${windSpeed} MPH</p><p>Humidity: ${humidity}%</p>`).addClass('card-bg-blue');
            j += 8;
        }

    }

    btn.on('click', function () {
        for (var i = 0; i < 5; i++) {
            cardContainer.children().eq(i).children().eq(0).html('')
        }
        console.log('ok')
        var inputVal = cityInput.val();
        var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + inputVal + '&limit=5&appid=6c31869795f0dd512d210bae2ff7b924'
        getLocApi(requestUrl);
        updateSavedData();
    }
    );

    searchHistory.on('click', '#button', function () {
        for (var i = 0; i < 5; i++) {
            cardContainer.children().eq(i).children().eq(0).html('')
        }
        var inputVal = $(this).text();
        var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + inputVal + '&limit=5&appid=6c31869795f0dd512d210bae2ff7b924'
        cityInput.val(inputVal);
        getLocApi(requestUrl);
    })
    checkForSavedData();

})