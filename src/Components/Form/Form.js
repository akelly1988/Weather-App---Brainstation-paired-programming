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

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const isFormvalid = () => {
    if (!searchTerm) return false;
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormvalid()) {
      return;
    }

    console.log(searchTerm);
    const getDestination = async (searchTerm) => {
      try {
        const { data } = await axios.get(
          `${BASE_URL_WEATHER}?q=${searchTerm}&appid=${API_KEY_WEATHER}`
        );
        setWeather(data);
        setError(false);
      } catch (error) {
        setWeather("");
        setSearchTerm("");
        setError(true);
      }
    };
    getDestination(searchTerm);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="searchBox">
          <input
            className="searchInput"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
          <button className="searchButton" type="submit">
            <i className="material-icons"></i>
          </button>
        </div>
      </form>
      {weather && <Weather weather={weather} />}
      {!weather && !error && <p>Loading</p>}
      {error && <p>Place does not exist. Maybe exist in parallel universe</p>}
    </>
  );
}

export default Form;
