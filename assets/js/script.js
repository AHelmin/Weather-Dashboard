//OFFIC HOUR QUESTIONS
//ask about calling functions in the middle of another function


//TODO
//https://api.openweathermap.org/geocoding?appid=859ytt99234r(api-key)
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
    };

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

    searchHistory.on('click', '#button', function () {
        currentDay.html('');
        for (var i = 0; i < 5; i++) {
            cardContainer.children().eq(i).children().eq(0).html('');
        }
        var inputVal = $(this).text();
        var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + inputVal + '&limit=5&appid=6c31869795f0dd512d210bae2ff7b924'
        cityInput.val(inputVal);
        getLocApi(requestUrl);
    })
    checkForSavedData();

})