const weather = (function () {
  //cache DOMS
  let weatherBtn = document.querySelector(".get__btn");
  let weatherContainer = document.querySelector(".weather__container");

  //Listeners / Bind events
  weatherBtn.addEventListener("click", searchedWeather);

  defaultWeather();

  async function defaultWeather() {
    const defaultData = await fetchWeather(true);

    displayWeather(defaultData);
  }

  async function fetchWeather(isDefaultWeather) {
    try {
      let inputtedCity = document.querySelector("#inputtedCity").value;
      //Fetch the data
      if (!isDefaultWeather) {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
           ${inputtedCity}?key=2Y6LF2M4NQ2EL922DF75MDBFL`
        );

        const result = await response.json();

        return result;
      } else {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/mandaluyong?key=2Y6LF2M4NQ2EL922DF75MDBFL`
        );

        const result = await response.json();

        return result;
      }
    } catch (err) {
      console.log(`error: ${err}`);
    }
  }

  async function searchedWeather() {
    const searchedData = await fetchWeather(false);

    displayWeather(searchedData);
  }

  function changeWeatherInfo(el, info) {
    el.textContent = info;
  }

  function displayWeather(dataPassed) {
    changeWeatherInfo(
      document.querySelector(".resolvedAddress"),
      dataPassed.resolvedAddress
    );
    changeWeatherInfo(
      document.querySelector(".conditions"),
      dataPassed.currentConditions.conditions
    );
    changeWeatherInfo(
      document.querySelector(".temp"),
      dataPassed.currentConditions.temp
    );
    changeWeatherInfo(
      document.querySelector(".feelsLike__text"),
      dataPassed.currentConditions.feelslike
    );
    changeWeatherInfo(
      document.querySelector(".wind__text"),
      dataPassed.currentConditions.windspeed
    );
    changeWeatherInfo(
      document.querySelector(".humidity__text"),
      dataPassed.currentConditions.humidity
    );
    changeWeatherInfo(
      document.querySelector(".visibility__text"),
      dataPassed.currentConditions.visibility
    );
    changeWeatherInfo(
      document.querySelector(".cloudCover__text"),
      dataPassed.currentConditions.cloudcover
    );
  }

  return {};
})();
