import React, { useState } from "react";
import axios from "axios";
import Weather from "../Weather/Weather";
const API_KEY_WEATHER = "96f23f416e2628f78d7fd10cc947516f";
const BASE_URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather";

function Form() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState("");
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
      } catch (error) {
        console.log("Error finding destination:", error);
      }
    };
    getDestination(searchTerm);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <Weather />
    </>
  );
}

export default Form;
