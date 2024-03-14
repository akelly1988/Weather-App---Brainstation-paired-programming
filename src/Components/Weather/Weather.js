function Weather({ weather }) {
  return (
    <>
      <div className="weather__container">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="icon"
        />
        <p>{Math.round(weather.main.temp - 273)}</p>
        <p>{weather.main.humidity}</p>
        <p>{weather.weather[0].description}</p>
      </div>
    </>
  );
}

export default Weather;
