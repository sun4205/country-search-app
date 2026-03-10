import { useState } from "react";
import "./App.css";

function App() {
  const [Countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCountry = async () => {
    if (!query) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);

      if (!res.ok) {
        throw new Error("Country not found");
      }

      const data = await res.json();

      setCountries(data);
    } catch (error) {
      setError(error.message);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <p className="title">Country Search App</p>
      <input
        type="text"
        placeholder="Please enter Country"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchCountry();
          }
        }}
      />
      <button className="button" onClick={fetchCountry}>
        search
      </button>
      <div className="page">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && Countries.length === 0 && !error && (
          <p>No country found</p>
        )}
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
