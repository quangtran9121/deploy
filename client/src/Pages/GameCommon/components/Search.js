import React, { useState } from 'react';
import './Search.scss';

function Search({ onQueryChange }) {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    const gameName = e.target.value;
    setQuery(gameName);
    onQueryChange(gameName); // Gửi game_name tới GameCommon qua prop
  };

  return (
    <div className="search">
      <input 
        type="text" 
        placeholder="Search Games" 
        value={query} 
        onChange={handleSearchChange} 
      />
    </div>
  );
}

export default Search;
