let formInput = $('#search-input');

// constant values
const weatherApiRootUrl = 'https://api.openweathermap.org/';
const apiKey = "71950b8e9ba0353f6b1800939888da14";

function clearPreviousSearch() {
  cityNameEl.text('');
  currentDateEl.text('');
  iconEl.attr('src', '');
  tempEl.text('');
  windEl.text('');
  humidityEl.text(''); 
}

function getLatLon(city) {
  console.log(city);
  
  // let apiKey2 = "4404babe01516afc672a8067f95cbabb";
  let geoURL = weatherApiRootUrl + "geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;  

  $.ajax({
      url: geoURL,
      method: "GET"    
    }).then(function(response) {
      console.log(response);

      
      let lat = response[0].lat;
      console.log(lat);

      let lon = response[0].lon;
      console.log(lon);

      weatherForecast(lat, lon)
  });      
};

function weatherForecast(lat, lon) {
  let cityURL = weatherApiRootUrl +"/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + '&units=metric';

  $.ajax({
    url: cityURL,
    method: "GET"    
  }).then(function(response) {
    console.log(response);

    todayWeather(response)
    futureForecast(response);
  });
}

function todayWeather(weather) {
  $('#today').css('border', 'black 2px');

  let cityName = weather.city.name;
  let currentDate = weather.list[0].dt_txt;
  let icon = weather.list[0].weather[0].icon;
  // let iconURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
  let temp = weather.list[0].main.temp;
  let wind = weather.list[0].wind.speed;
  let humidity = weather.list[0].main.humidity;
  

  // iconEl.attr('src', iconURL);
  
  console.log(cityName + '/' + currentDate + '/' + icon + '/' + temp + '/' + wind + '/' + humidity);

  cityNameEl.text(cityName);
  currentDateEl.text(currentDate);
  tempEl.text(temp);
  windEl.text(wind);
  humidityEl.text(humidity); 
  
}

function futureForecast(weather) {

  // create html elements for cards
  let cardEl = $('<div>');
  let cardBodyEl = $('<div>');
  let cardDateEl = $('<h4>');
  let cardIconEl = $('<img>');
  let cardTempEl = $('<div>');
  let cardWindEl = $('<div>');
  let cardHumEl = $('<div>');

  console.log(weather.list.length);
  for(let i = 5; i < weather.list.length; i += 8){
    console.log('HEllo');
    console.log([i]);
    
  
    // add classes to cards
    card.addClass('card');
    card.addClass('card-body');
    cardDate.addClass('card-title');
  
    card.css('display', 'flex');


    let cardIconImg = weather.list[i].weather[i].icon;
    console.log('Link: ' + cardIconImg);
    // let cardIconURL = 'https://openweathermap.org/img/wn/' + cardIconImg + '@2x.png';
    

    // cardIcon.attr('src', cardIconURL);

    let cardDate = weather.list[i].dt_txt;    
    let cardTemp = weather.list[i].main.temp;
    let cardWind = weather.list[i].wind.speed;
    let cardHum = weather.list[i].main.humidity;

  
    $('#forecast').append(cardEl);
    cardEl.append(cardBodyEl);
    cardBodyEl.append(cardDateEl);
    cardBodyEl.append(cardIconEl);
    cardBodyEl.append(cardTempEl);
    cardBodyEl.append(cardWindEl);
    cardBodyEl.append(cardHumEl);
  }

}


// create HTML elements that will be appended to the screen for todays weather
let cityNameEl = $('<h2>');
let currentDateEl = $('<div>');
let iconEl = $('<img>');
let tempEl = $('<div>');
let windEl = $('<div>');
let humidityEl = $('<div>');

$('#today').prepend(cityNameEl);
$('#today').append(currentDateEl);
$('#today').append(iconEl);
$('#today').append(tempEl);
$('#today').append(windEl);
$('#today').append(humidityEl);


// jquery event listner, runs the function when the user submits the form with id #search-form
$("#search-form").on('submit', function(event) {
    event.preventDefault();

    // assigns the input value to querySearch var
    let querySearch = formInput.val().trim();

    console.log('City:' + querySearch);

    // clears the input field
    formInput.val('');

    // clear existing data  
      
    
    clearPreviousSearch();

    // calls cityWeather function and passes querySearch as a parameter
    getLatLon(querySearch);
});