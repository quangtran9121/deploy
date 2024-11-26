import React, { useState } from 'react';
import './Filter.scss';

function Filter({ genres, developers, languages, players, mobileCompatible, onApplyFilters }) {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedMobile, setSelectedMobile] = useState('');

  const handleApply = () => {
    onApplyFilters({
      genres: selectedGenre,
      developer: selectedDeveloper,
      language: selectedLanguage,
      players: selectedPlayer,
      mobileCompatible: selectedMobile,
    });
  };

  return (
    <div className="filter">
      <h3>Filters</h3>
      {/* Render các bộ lọc */}
      <div className="filter-category">
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">Genres</option>
          {genres.map((genres, index) => (
            <option key={index} value={genres}>{genres}</option>
          ))}
        </select>
      </div>
      <div className="filter-category">
        <select value={selectedDeveloper} onChange={(e) => setSelectedDeveloper(e.target.value)}>
          <option value="">Developers</option>
          {developers.map((dev, index) => (
            <option key={index} value={dev}>{dev}</option>
          ))}
        </select>
      </div>
      <div className="filter-category">
        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="">Languages</option>
          {languages.map((lang, index) => (
            <option key={index} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
      <div className="filter-category">
        <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)}>
          <option value="">Players</option>
          {players.map((players, index) => (
            <option key={index} value={players}>{players}</option>
          ))}
        </select>
      </div>
      <div className="filter-category">
        <select value={selectedMobile} onChange={(e) => setSelectedMobile(e.target.value)}>
          <option value="">Mobile Compatible</option>
          {mobileCompatible.map((compat, index) => (
            <option key={index} value={compat}>{compat}</option>
          ))}
        </select>
      </div>
      <button className="apply-button" onClick={handleApply}>Apply</button>
    </div>
  );
}

export default Filter;
