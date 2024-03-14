import React, { useState } from "react";
import axios from "axios";
import Weather from "../Weather/Weather";
import "./Form.scss";

const API_KEY_WEATHER = "96f23f416e2628f78d7fd10cc947516f";
const BASE_URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather";

function Form() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const isFormValid = () => {
    return !!searchTerm;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      return;
    }

    try {
      const { data } = await axios.get(
        `${BASE_URL_WEATHER}?q=${searchTerm}&appid=${API_KEY_WEATHER}`
      );
      setWeather(data);
      setError(false);
      setSubmitted(true);
    } catch (error) {
      setWeather("");
      setSearchTerm("");
      setError(true);
      setSubmitted(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`searchBox ${submitted ? "submitted" : ""}`}>
          <input
            className="searchInput"
            type="text"
            placeholder="Enter your destination"
            value={searchTerm}
            onChange={handleChange}
          />
          <button className="searchButton" type="submit">
            <i className="material-icons"></i>
          </button>
        </div>
      </form>
      {weather && <Weather weather={weather} />}
      {error && (
        <p className="error">
          This place does not exist! Maybe exist in parallel universe?
        </p>
      )}
    </>
  );
}

export default Form;
