// Today's Card Variables:
let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar");

// Next Days Variables:
let nextDay = document.getElementsByClassName("nextDay"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    maxDegree = document.getElementsByClassName("max-degree"),
    minDegree = document.getElementsByClassName("min-degree"),
    nextDayDescription = document.getElementsByClassName("nextDay-description"),
    currentCity = "Cairo",
    responseApi,
    monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function getWeather() {
    try {
        let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=790126e6a09342cfa6a162205232802&q=${currentCity}&days=3`);
        responseApi = await apiResponse.json();
        console.log(responseApi); // Check the structure of the API response
        getWeatherToday();
        getWeatherNextDays();
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

getWeather();

function getWeatherToday() {
    if (!responseApi || !responseApi.location || !responseApi.current) {
        console.error("Invalid API response for today's weather.");
        return;
    }
    
    let date = new Date();
    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML = responseApi.location.name;
    todayDegree.innerHTML = responseApi.current.temp_c;
    todayIcon.setAttribute("src", `https:${responseApi.current.condition.icon}`);
    description.innerHTML = responseApi.current.condition.text;
    humidty.innerHTML = responseApi.current.humidity;
    wind.innerHTML = responseApi.current.wind_kph;
    compass.innerHTML = responseApi.current.wind_dir;
}

function getWeatherNextDays() {
    if (!responseApi || !responseApi.forecast || !responseApi.forecast.forecastday) {
        console.error("Invalid API response for next days' weather.");
        return;
    }

    for (let i = 0; i < nextDay.length; i++) {
        if (i + 1 >= responseApi.forecast.forecastday.length) break;

        nextDay[i].innerHTML = days[new Date(responseApi.forecast.forecastday[i + 1].date).getDay()];
        nextDayIcon[i].setAttribute("src", `https:${responseApi.forecast.forecastday[i + 1].day.condition.icon}`);
        maxDegree[i].innerHTML = responseApi.forecast.forecastday[i + 1].day.maxtemp_c;
        minDegree[i].innerHTML = responseApi.forecast.forecastday[i + 1].day.mintemp_c; // Fixed typo
        nextDayDescription[i].innerHTML = responseApi.forecast.forecastday[i + 1].day.condition.text;
    }
}

searchBar.addEventListener("keyup", function () {
    currentCity = searchBar.value.trim();
    if (currentCity) {
        getWeather();
    }
});
