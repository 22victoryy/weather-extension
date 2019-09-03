window.addEventListener('load', function() {
  var long;
  var lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${long}&cnt=1&appid=9127a894a9e2c98639ed5ca00991a2c7`;
      //api needs change
      fetch(api)
        .then (weather => {
          return weather.json();
        })
        .then(data => {
          console.log(data)
          const {} = data.list
        })
    });
  } else {
    console.log("Please download Live Service Plugin for VScode.")
  }
});