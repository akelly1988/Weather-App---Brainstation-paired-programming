import React, { useEffect, useState } from "react";
import axios from "axios";
import Weather from "../Weather/Weather";
import "./Form.scss";
import Currency from "../Currency/Currency";
import countryToCurrency, { Currencies, Countries } from "country-to-currency";

const API_KEY_WEATHER = "96f23f416e2628f78d7fd10cc947516f";
const BASE_URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather";

function Form() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [currency, setCurrency] = useState("");
  const [country, setCountry] = useState("");
  const [gbp, setGbp] = useState("");
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

    const getDestination = async (searchTerm) => {
      try {
        const { data } = await axios.get(
          `${BASE_URL_WEATHER}?q=${searchTerm}&appid=${API_KEY_WEATHER}`
        );
        setWeather(data);
        setError(false);
        setCountry(data.sys.country);
        setSubmitted(true);
      } catch (error) {
        setWeather("");
        setSearchTerm("");
        setError(true);
        setCurrency("");
        setSubmitted(true);
      }
    };
    getDestination(searchTerm);
  };

  useEffect(() => {
    if (country) {
      const countryCode = countryToCurrency[country];

      const getCurreny = async (currency) => {
        try {
          const { data } = await axios.get(
            "https://api.currencyapi.com/v3/latest?apikey=cur_live_5gnc4exrxrLGalZk9B3W7BZgJvJK3c7kQgTXu2i6"
          );

          const currencyData = data.data;
          setGbp(data.data.GBP.value);
          setCurrency(currencyData[countryCode]);
        } catch (error) {}
      };
      getCurreny(countryCode);
    }
  }, [country]);

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
          Place does not exist. Maybe exist in parallel universe
        </p>
      )}
      {currency && <Currency currency={currency} gbp={gbp} />}
    </>
  );
}

export default Form;
