const Countries = ({ countries, setSelectedCountry, fetchWeather }) => {
  const handleShow = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital);
  };

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}{" "}
          <button onClick={() => handleShow(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;
