import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const api_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  // Përditëso filtrin dhe kërko vendet
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value) {
      fetchCountries(value);
    } else {
      setCountries([]);
      setSelectedCountry(null);
    }
  };

  // Merr vendet nga API dhe filtro sipas query
  const fetchCountries = (searchString) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        const filteredCountries = response.data.filter((country) =>
          country.name.common.toLowerCase().includes(searchString.toLowerCase())
        );
        setCountries(filteredCountries);

        if (filteredCountries.length === 1) {
          setSelectedCountry(filteredCountries[0]);
          fetchWeather(filteredCountries[0].capital);
        }
      })
      .catch((error) => console.error("Error fetching data", error));
  };

  // Merr të dhënat e motit
  const fetchWeather = (capital) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
      )
      .then((response) => setWeather(response.data))
      .catch((error) => console.error("Error fetching weather", error));
  };

  return (
    <div>
      <h1>Country Finder</h1>
      <Filter filter={query} handleFilterChange={handleInputChange} />
      {countries.length > 10 && (
        <p>Too many matches, please specify your search further.</p>
      )}
      {countries.length > 0 && countries.length <= 10 && (
        <Countries
          countries={countries}
          setSelectedCountry={setSelectedCountry}
          fetchWeather={fetchWeather}
        />
      )}
      {selectedCountry && (
        <div className="container">
          <div className="country-info">
            <h2>{selectedCountry.name.common}</h2>
            <img
              src={selectedCountry.flags.png}
              alt={`Flag of ${selectedCountry.name.common}`}
            />
            <p>Capital: {selectedCountry.capital}</p>
            <p>Population: {selectedCountry.population}</p>
            <h3>Languages:</h3>
            <ul>
              {Object.values(selectedCountry.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>

          {weather && (
            <div className="weather-info">
              <h3>Weather in {selectedCountry.capital}</h3>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default App;
