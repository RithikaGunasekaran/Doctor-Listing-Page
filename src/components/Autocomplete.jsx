// components/Autocomplete.jsx
import React, { useState } from 'react';

export default function Autocomplete({ doctors, setSearchParams }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim()) {
      const matches = doctors
        .filter(doc => doc.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const applySearch = (name) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('name', name);
      return newParams;
    });
    setInput(name);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      applySearch(input);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        data-testid="autocomplete-input"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full border border-gray-300 rounded px-4 py-2"
        placeholder="Search doctors by name"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full mt-1 rounded shadow">
          {suggestions.map((doc, index) => (
            <li
              key={index}
              data-testid="suggestion-item"
              onClick={() => applySearch(doc.name)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
