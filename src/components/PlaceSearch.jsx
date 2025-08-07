import React, { useState, useEffect } from "react";

const MAPTILER_API_KEY = import.meta.env.VITE_MAP_API_KEY;

const PlaceSearch = ({ onSelectPlace }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length === 0 || selectedPlace) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${MAPTILER_API_KEY}`
        );
        const data = await response.json();
        setSuggestions(data.features || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300); // Debounce
    return () => clearTimeout(debounceTimer);
  }, [query, selectedPlace]);

  const handleSelect = (place) => {
    setSelectedPlace(place);
    setQuery(place.place_name);
    setSuggestions([]);
    onSelectPlace?.(place);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedPlace(null); // reset if user wants to type again
  };

  return (
    <div className="  mx-auto mt-4">
      <input
        type="text"
        placeholder="Search for a place..."
        className="border px-4 py-2 w-full rounded-lg "
        value={query}
        onChange={handleInputChange}
      />

      {/* Only show suggestions if no place is selected */}
      {!selectedPlace && suggestions.length > 0 && (
        <ul className="border border-t-0 rounded-b bg-white shadow max-h-60 overflow-y-auto">
          {suggestions.map((place) => (
            <li
              key={place.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(place)}
            >
              {place.place_name}
            </li>
          ))}
        </ul>
      )}

      {/* {selectedPlace && (
        <div className="mt-4 p-2 bg-green-100 rounded">
          <h3 className="font-bold">Selected Place:</h3>
          <p>{selectedPlace.place_name}</p>
          <p>Longitude: {selectedPlace.geometry.coordinates[0]}</p>
          <p>Latitude: {selectedPlace.geometry.coordinates[1]}</p>
        </div>
      )} */}
    </div>
  );
};

export default PlaceSearch;
