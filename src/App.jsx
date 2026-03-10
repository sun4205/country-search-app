import { useState } from "react";
import "./App.css";

function App() {
  const [Countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  const fetchCountry = async () => {
    if (!query) return;

    const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);
    const data = await res.json();

    setCountries(data);
  };

  return (
    <div className="container">
      <p className="title">Country Search App</p>
      <input
        type="text"
        placeholder="Please enter Country"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="button" onClick={fetchCountry}>
        search
      </button>
      <div className="page">
        {Countries.map((country) => (
          <div key={country.cca3}>
            <h3>{country.name.common}</h3>
            <p>Capital:{country.capital?.[0]}</p>
            <p>Population:{country.population}</p>
            <img src={country.flags.png} width="100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
