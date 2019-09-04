window.addEventListener('load', function() {
  var long;
  var lat;
  var temperatureDescription = document.querySelector(".Temperature-Description");
  var temperatureDegree = document.querySelector(".Degree");
  var location = document.querySelector(".Location-Timezone")

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // const api = `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${long}&cnt=1&appid=9127a894a9e2c98639ed5ca00991a2c7`;
      //api needs change
      const proxy = "https://cors-anywhere.herokuapp.com/"
      const api = `${proxy}https://api.darksky.net/forecast/68caf3cad151571d05b5843c6cb4eb88/${lat},${long}`;
      fetch(api)
        .then (weather => {
          return weather.json();
        })
        .then(data => {
          console.log(data)
          const {temperature, summary} = data.currently;
          // Set DOM elements from API
          // console.log(temperature)
          // console.log(summary)
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          location.textContent = data.timezone;


        })
    });


  } else {
    console.log("Please download Live Service Plugin for VScode.")
  }
});



