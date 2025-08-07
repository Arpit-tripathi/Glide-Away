import React, { useState, useEffect } from "react";

const Autocomplete = ({ places, value, onChange }) => {
  const [query, setQuery] = useState(value || "");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const matches = places.filter(place =>
        place.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPlaces(matches);
    } else {
      setFilteredPlaces([]);
    }
  }, [query, places]);

  const handleSelect = (place) => {
    setQuery(place.name);       // show the selected name in input
    setFilteredPlaces([]);      // hide the dropdown
    onChange?.(place);          // notify parent only on selection
  };

  return (
    <div className="">
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search a place to travel in India..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filteredPlaces.length > 0 && (
        <ul className="mt-2 border border-gray-300 rounded-lg shadow-md bg-white max-h-60 overflow-y-auto">
          {filteredPlaces.map((place) => (
            <li
              key={place.id}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSelect(place)}
            >
              <strong>{place.name}</strong>, {place.state}
              <div className="text-sm text-gray-600">{place.popular_for}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
