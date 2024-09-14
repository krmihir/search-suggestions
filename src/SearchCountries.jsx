import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import countriesData from "./data/countries.json"; // Import the JSON data

const SearchCountries = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null); // State for selected country

  // Handle input change and filter suggestions
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filteredSuggestions = countriesData.filter(
      (item) =>
        item.country.toLowerCase().includes(value.toLowerCase()) ||
        item.capital.toLowerCase().includes(value.toLowerCase())
    );

    if (value && filteredSuggestions.length > 0) {
      setSuggestions(filteredSuggestions);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    const foundCountry = countriesData.find(
      (item) =>
        item.country.toLowerCase() === inputValue.toLowerCase() ||
        item.capital.toLowerCase() === inputValue.toLowerCase()
    );

    if (foundCountry) {
      setSelectedCountry(foundCountry);
      setDropdownVisible(false); // Hide suggestions
    } else {
      setSelectedCountry(null);
      alert("Country not found!");
    }
  };

  // Handle suggestion click and populate search bar
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.country); // Populate input with selected country
    setSelectedCountry(suggestion); // Display the selected country's data
    setDropdownVisible(false); // Hide dropdown
  };

  // Prevent dropdown from closing on input click
  const handleInputClick = () => {
    if (inputValue && suggestions.length > 0) {
      setDropdownVisible(true);
    }
  };

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-start vh-100"
      style={{ paddingTop: "3vh" }}
    >
      {/* <h1 className="text-center">Search for Countries</h1> */}
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-8 col-lg-6">
          {/* Search Input with Button */}
          <div className="input-group mb-3 shadow-sm">
            <input
              type="text"
              className="form-control p-3 border-0 rounded-pill"
              placeholder="Search by country or capital..."
              value={inputValue}
              onChange={handleInputChange}
              onClick={handleInputClick} // Ensure dropdown is visible on input click
              style={{ borderRadius: "20px", outline: "none" }}
            />
            <button
              className="btn btn-primary rounded-pill ms-2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Dropdown for Suggestions */}
          {isDropdownVisible && (
            <ul
              className="list-group position-absolute w-100 shadow-sm"
              style={{ zIndex: 10 }}
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action py-2 px-3"
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{ cursor: "pointer" }}
                >
                  <strong>{suggestion.country}</strong> - {suggestion.capital}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Country Information Display */}
      {selectedCountry && (
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title mb-4 text-center text-primary">
                  {selectedCountry.country}
                </h4>
                <p className="card-text">
                  <strong>Capital:</strong> {selectedCountry.capital}
                </p>
                <p className="card-text">
                  <strong>Population:</strong>{" "}
                  {selectedCountry.population.toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>Official Language(s):</strong>{" "}
                  {Array.isArray(selectedCountry.official_language)
                    ? selectedCountry.official_language.join(", ")
                    : selectedCountry.official_language}
                </p>
                <p className="card-text">
                  <strong>Currency:</strong> {selectedCountry.currency}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCountries;
