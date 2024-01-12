
//api addreww and my api key, will be left for future reference
//https://api.openweathermap.org/geocoding?appid=859ytt99234r(api-key)
//my api key === 6c31869795f0dd512d210bae2ff7b924

//function to ensure that this code will wait until the page is done loading
$(document).ready(function () {
    const today = dayjs();
    const btn = $('#btn');
    const cityInput = $('#city-name');
    const searchContainer = $('.search-container');
    const searchHistory = $('#search-history');
    const currentDay = $('#current-day');
    const cardContainer = $('#five-day');
    const cardBody = $('#card-body');
    let iconCode;
    let savedSearches = ['', '', '', '', '', '', '', ''];

 //code block below was from the instructor, will be left here for future reference and for review
    // let displayHistory = () => savedSearches.reverse().filter( (_,idx) => idx <= 3).forEach( (city) => 
    //     searchHistory.append(`<button type="button" id="button">${city}</button>`))

    //looks for saved data and if it exists writes the data to the savedSearches array
    function checkForSavedData() {
        const savedData = localStorage.getItem('savedSearches');
        if (savedData) {
            savedSearches = JSON.parse(savedData)
        }
        displaySearchHistory()   
    };

    //looks through savedSearches if they exist and appends buttons to page
    function displaySearchHistory() {
        searchHistory.html("")
        for (var i = 0; i < savedSearches.length; i++) {
            console.log[savedSearches[i]]
            if (savedSearches[i] !== '') {
            searchHistory.append(`<button type="button" id="button">${savedSearches[i]}</button>`)
            }
        };
    };

//code block below was from the instructor, will be left here for future reference and for review
    // function displaySearchHistory2() {
    //     searchHistory.html("")
    //     savedSearches.reverse().forEach( function(city, idx) {
    //         if( idx <= 3 ){
    //             searchHistory.append(`<button type="button" id="button">${city}</button>`)
    //         }
    //     })
    // };

    
    //saves the city name to savedSearches array if it is not already part of the saved cities, then writes the array to local storage
    function updateSavedData() {
        if (!savedSearches.find( function(city){ city === cityInput.val()})) {
        savedSearches.unshift(cityInput.val());
        }
        if (savedSearches.length > 8) {
            savedSearches.pop();
        }
        localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    };

    // grabs the latitude and longitude of the city we queried then builds a url to be sent into the next api function
    async function getLocApi(requestUrl) {
        const response = await fetch(requestUrl);//   async await method
        const data = await response.json();
        var cityLat = data[0].lat;
        var cityLon = data[0].lon
        var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=6c31869795f0dd512d210bae2ff7b924';
        await getWeatherApi(weatherUrl);
    };

    //uses the api built by the getLocApi funciton to find weather conditions in that area then sends data in the writeWeather function
    async function getWeatherApi(requestUrl) {
        const response = await fetch(requestUrl);//   async await method
        const data = await response.json();
        writeWeather(data);
    };

    //looks at the data, pulls out desired info, formats, and writes this data to the webpage for users to see
    function writeWeather(data) {
        var dateTime = data.list[2].dt_txt;
        var adjustedDate = dayjs(dateTime).format('M/D/YYYY')
        var cloudStatus = data.list[2].weather[0].main;
        var temp = data.list[2].main.temp;
        var tempF = (temp - 273.15) * 9 / 5 + 32;
        var humidity = data.list[2].main.humidity;
        var windSpeed = data.list[2].wind.speed;
       getIcon(cloudStatus);      
        var inputVal = cityInput.val();
        currentDay.append(`<h2>${inputVal} (${adjustedDate}) ${iconCode}</h2><p>Temp: ${tempF.toFixed(2)}°F</p><p>Wind: ${windSpeed} MPH</p><p>Humidity: ${humidity}%</p>`)
        var j = 2;
        for (var i = 0; i < 5; i++) {
            var dateTime = data.list[j].dt_txt;
            var adjustedDate = dayjs(dateTime).format('M/D/YYYY')
            var cloudStatus = data.list[j].weather[0].main;
            getIcon(cloudStatus);
            var temp = data.list[j].main.temp;
            var tempF = (temp - 273.15) * 9 / 5 + 32;
            var humidity = data.list[j].main.humidity;
            var windSpeed = data.list[j].wind.speed;
            cardContainer.children().eq(i).children().eq(0).append(`<h5>${adjustedDate}</h5>${iconCode}<p>Temp: ${tempF.toFixed(2)}°F</p><p>Wind: ${windSpeed} MPH</p><p>Humidity: ${humidity}%</p>`).addClass('card-bg-blue');
            j += 8;
        }
        //this function call is to ensure that the search history and buttons are updated even without a refresh from the user
        displaySearchHistory()
    };

    // checks the variable cloudStatus to assign a weather icon for the writeWeather function
    function getIcon(cloudStatus) {
        
        if (cloudStatus === 'Clouds') {
            iconCode = '<img src="./assets/images/cloudy_rain_sun_icon.png" alt="Clouds">'
        } else if (cloudStatus === 'Rain') {
            iconCode = '<img src="./assets/images/rain_weather_icon.png" alt="Rain Clouds">'
        } else if (cloudStatus === 'Snow') {
            iconCode = '<img src="./assets/images/snow_icon.png" alt="Snow Clouds">'
        } else {
            iconCode = '<img src="./assets/images/sunny_weather_icon.png" alt="Sun Icon">'
        }
        return iconCode
    }

    // event listener for the search button
    btn.on('click', function () {
        currentDay.html('');
        for (var i = 0; i < 5; i++) {
            cardContainer.children().eq(i).children().eq(0).html('');
        }
        console.log('ok')
        var inputVal = cityInput.val();
        var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + inputVal + '&limit=5&appid=6c31869795f0dd512d210bae2ff7b924'
        getLocApi(requestUrl);
        updateSavedData();
    }
    );

    // event listener for the savedSearches buttons to make them search the respective city on mouseclick by constructing the api address for the getLocApi function
    searchHistory.on('click', '#button', function () {
        currentDay.html('');
        for (var i = 0; i < 5; i++) {
            cardContainer.children().eq(i).children().eq(0).html('');
        }
        var inputVal = $(this).text();
        var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + inputVal + '&limit=5&appid=6c31869795f0dd512d210bae2ff7b924'
        cityInput.val(inputVal);
        getLocApi(requestUrl);
    });
    // initiates the js for the webpage
    checkForSavedData();

});