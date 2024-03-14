import "./Weather.scss";

function Weather({ weather }) {
  return (
    <>
      <div className="weather__container">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="icon"
        />
        <p className="weather__description">{weather.weather[0].description}</p>
        <p className="weather__temp">
          {Math.round(weather.main.temp - 273)} degrees C
        </p>
        <p className="weather__humid">Humidity: {weather.main.humidity}%</p>
      </div>
    </>
  );
}

export default Weather;
