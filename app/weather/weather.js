// By victorchanyoung.cho@mail.utoronto.ca
// September 3rd, 2019

var options = {
  enableHighAccuracy: true,
  timeout: 100000,
  maximumAge: 0
};

var success = function(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

var error = function(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

var getDate = function () {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today
}

var ToCelsius = function (temp) {
  celsius = (temp - 32) * (5 / 9);
  return Math.floor(celsius);
};

var setIcons = function(icon, iconID) {
  const skycons = new Skycons({color: "white"});
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
};

window.addEventListener('load', function() {
  var temperatureDescription = document.querySelector(".Temperature-Description");
  var temperatureDegree = document.querySelector(".Degree");
  var location = document.querySelector(".Location-Timezone");
  var temperatureSection = document.querySelector(".Temperature-Section");
  const temperaturespan = document.querySelector(".Temperature-Section span");
  var CurrentDate = document.querySelector(".Date");

  CurrentDate.textContent = getDate();


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      var long = position.coords.longitude;
      var lat = position.coords.latitude;

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

          const {temperature, summary, icon} = data.currently;
          // Set DOM elements from API
          // console.log(temperature)
          // console.log(summary)
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          location.textContent = data.timezone;
          // set icon
          setIcons(icon, document.querySelector(".icon"));
          //change to celsius, seperate to func
          temperatureSection.addEventListener("click", () => {
            if (temperaturespan.textContent === "F") {
              temperaturespan.textContent = "C";
              temperatureDegree.textContent = ToCelsius(temperature);
            } else {
              temperaturespan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }

          });
        })
    });
  } else {
    console.log("Please install live service to simulate environment.")
  }
});


