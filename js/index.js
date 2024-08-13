 //Today's Card Variables:                                                 
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

//Next Days Variables:                          
let nextDay = document.getElementsByClassName("nextDay"),
nextDayIcon = document.getElementsByClassName("nextDay-icon"),
maxDegree = document.getElementsByClassName("max-degree"),
minDegree = document.getElementsByClassName("min-degree"),
nextDayDescription = document.getElementsByClassName("nextDay-description"),
currentCity = "Cairo",
apiResponse,
responseApi,
monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
days = [
 "Sunday",
 "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

 async function getWeather() {
 let apiResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=790126e6a09342cfa6a162205232802&q=${currentCity}&days=3`);
 responseApi=await apiResponse.json();
 console.log(responseApi);
 getWeatherToday(currentCity);
 getWeatherNextDays(currentCity);
}

getWeather(currentCity);

let date=new Date();
function getWeatherToday(){
today.innerHTML=days[date.getDay()];
todayDate.innerHTML=`${date.getDate()}${monthName[date.getMonth()]}`;
cityLocation.innerHTML = responseApi.location.name;
todayDegree.innerHTML=responseApi.current.temp_c;
todayIcon.setAttribute("src", `https:${responseApi.current.condition.icon}`);
description.innerHTML = responseApi.current.condition.text;
humidty.innerHTML = responseApi.current.humidity;
wind.innerHTML= responseApi.current.wind_kph;
compass.innerHTML = responseApi.current.wind_dir;
}
function getWeatherNextDays() {
  for (let i = 0; i < nextDay.length; i++) {
    nextDay[i].innerHTML = days[new Date(responseApi.forecast.forecastday[i+1].date).getDay()] ;
    nextDayIcon[i].setAttribute("src",`https:${responseApi.forecast.forecastday[i+1].day.condition.icon}`);
    maxDegree[i].innerHTML=responseApi.forecast.forecastday[i+1].day.maxtemp_c;
    minDegree[i].innerHTML=responseApi.forecast.forecastday[i+1].day. mintemp_c;
    nextDayDescription[i].innerHTML=responseApi.forecast.forecastday[i+1].day.condition.text;
  }
}
searchBar.addEventListener("keyup",function(){

  currentCity =searchBar.value ;
  console.log(currentCity);
 
getWeather(currentCity)

})