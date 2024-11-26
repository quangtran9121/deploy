import React, { useState, useEffect } from 'react';
import './Game.scss';
import request from '../../config/config';
import Header from '../../Layout/Header/Header';
import Footer from '../../Layout/Footer/Footer';
import Filter from './components/Filter';
import FeaturedGamesCarousel from './components/FeaturedGames';
import GameCarousel from './components/GameCarousel';
import Search from './components/Search';
import Sort from './components/Sort';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function GameCommon() {
  const [filteredGames, setFilteredGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [players, setPlayers] = useState([]);
  const [mobileCompatible, setMobileCompatible] = useState([]);
  const [filters, setFilters] = useState({
    game_name: '',
    genres: '',
    developer: '',
    language: '',
    players: '',
    mobileCompatible: '',
    sort: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State để mở/đóng Filter trên màn hình nhỏ

  useEffect(() => {
    const fetchFiltersAndGames = async () => {
      try {
        const filterResponse = await request.get('/api/filters');
        const { genres, developers, languages, players, mobileCompatible } = filterResponse.data;

        setGenres(genres);
        setDevelopers(developers);
        setLanguages(languages);
        setPlayers(players);
        setMobileCompatible(mobileCompatible);

        await handleApplyFilters({});
      } catch (error) {
        console.error("Error fetching filters and games:", error);
      }
    };

    fetchFiltersAndGames();
  }, []);

  const handleApplyFilters = async (newFilters) => {
    const combinedFilters = { ...filters, ...newFilters };
    setFilters(combinedFilters);

    try {
      const response = await request.post('/api/game', combinedFilters);
      setFilteredGames(response.data);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const handleSortChange = (sort) => {
    handleApplyFilters({ sort }); // Gọi hàm với trường `sortType` mới
  };

  return (
    <div>
      <Header />
      <div className="app">
        <FeaturedGamesCarousel />
        <div className="main">
          {/* Sidebar Filter */}
          <div className={`sidebar ${isFilterOpen ? 'open' : ''}`}>
            <Filter
              genres={genres}
              developers={developers}
              languages={languages}
              players={players}
              mobileCompatible={mobileCompatible}
              onApplyFilters={handleApplyFilters}
            />
          </div>

          {/* Overlay cho Filter khi ở chế độ nhỏ */}
          {isFilterOpen && (
            <div className="sidebar-overlay" onClick={() => setIsFilterOpen(false)}></div>
          )}

          {/* Content chính */}
          <div className="content">
            <div className="controls">
              <div className="title">
                {/* Nút Hamburger */}
                <button
                  className="hamburger-menu"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <FontAwesomeIcon icon={isFilterOpen ? faTimes : faBars} />
                </button>
                Games
              </div>
              <div className="search-sort">
                <Search onQueryChange={(gameName) => handleApplyFilters({ game_name: gameName })} />
                <Sort onSortChange={handleSortChange} />
              </div>
            </div>
            {filteredGames.length > 0 ? (
              <GameCarousel games={filteredGames} />
            ) : (
              <div className="no-results">No matches!</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GameCommon;
