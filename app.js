const API = "8fc495c975dc5f64690d2cfebc1b548e";

const fetchCountryWeather = async (name) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8fc495c975dc5f64690d2cfebc1b548e`;

  const res = await fetch(url);
  if (!res.ok) {
    renderError(`Something went wrong ${res.status}`);
    throw new Error();
  }
  const data = await res.json();
  //console.log(data);
  renderCountryWeather(data);
};

const renderError = () => {
  const rowDiv = document.querySelector(".row");
  rowDiv.innerHTML = `<h2>Weather can not fetched!!</h2>`;
};
const cityList = [];
const renderCountryWeather = (data) => {
  console.log(data);
  cityList.unshift(data);
  if (cityList.length > 3) {
    cityList.pop();
  }
  console.log(cityList);
  document.querySelector(".row").innerHTML = "";
  cityList.forEach((city) => {
    console.log(city.name);

    const {
      coord: { lon, lat },
      main: { humidity, sea_level, temp },
      name,
      sys: { country },
      visibility,
      weather,
      wind: { speed },
    } = city;
    const { id, main, description, icon } = weather[0];

    let weatherStatu;
    let colorStatu;
    let backgroundImg;
    if (id > 600 && id <= 800) {
      weatherStatu = "rainy";
      colorStatu = "secondary";
      backgroundImg = "rainy";
    } else if (id > 800) {
      weatherStatu = "sunny";
      colorStatu = "warning";
      backgroundImg = "sunny";
    } else {
      weatherStatu = "snowing";
      colorStatu = "info";
      backgroundImg = "snowing";
    }

    const rowDiv = document.querySelector(".row");
    rowDiv.innerHTML += `
        <div class="col-md-4">
          <div class="card border border-5 border-white">
            <div class="card-body ${backgroundImg} p-4">
              <h5 class="card-title w-100 d-inline-block position-relative">
                ${name}
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning"
                  >${country}</span
                >
              </h5>
              <p class="card-subtitle display-1 fw-bolder mb-2">${Math.round(
                temp - 273.15
              )}°C</p>
              
              <p>
                <span class="display-1 text-${colorStatu} material-symbols-outlined">${weatherStatu} </span>
              </p>
              <div class="border-start border-info border-5 ps-2">
              <p>
              <span>Humidity:${humidity}%</span>
              <span class="ms-2">Visibility:${(visibility / 1000).toFixed(
                1
              )}km</span>
              </p>
              <p>
              <span>Sea Level:${sea_level}</span>
              <span class="ms-2">Wind:${speed}m/s</span>
              </p>
              </div>
              <p class="subtitle display-6 text-muted">${description}</p>
            </div>
            <div class="card-footer">
            <iframe
              width="100%"
              height="100%"
              style="border:0"
              loading="lazy"
              referrerpolicy="referrer"
              src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBKWycHdEHVh5bzIjJqy0uqDdX153Cubr8
              &center=${lat},${lon}
              &zoom=7
              &maptype=satellite">
            </iframe>
            </div>
          </div>
        </div>
      `;
  });
};

const container = document.querySelector(".container");

container.addEventListener("click", (e) => {
  const cityName = document.querySelector("#city-name");
  if (cityName.value != "") {
    if (e.target.classList.contains("btn")) {
      fetchCountryWeather(cityName.value);
      cityName.value = "";
    }
  }
});
