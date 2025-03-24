import { useEffect, useState } from "react";
import "./countrycard.css";

const Card = ({ flag, name }) => {
  return (
    <div className="countryCard">
      <img
        src={flag}
        alt={`flag of ${name}`}
        style={{ width: "100px" }}
      />
      <h2>{name}</h2>
      <p></p>
      <span></span>
    </div>
  );
};

function Countries() {
  const API = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredCountries = countries.filter(({ common }) =>
    common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "300px",
          textAlign: "center",
          fontSize: "16px",
          border: "1px solid black",
          borderRadius: "5px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {filteredCountries.map(({ common, png }) => (
          <Card key={common} name={common} flag={png} />
        ))}
      </div>
    </div>
  );
}

export default Countries;

