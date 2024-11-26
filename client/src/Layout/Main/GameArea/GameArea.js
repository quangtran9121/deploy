import React, { useState, useEffect } from 'react';
import styles from './GameArea.module.scss'; // Import SCSS module
import request from '../../../config/config';// Import Axios for API calls
import { Link } from 'react-router-dom';

const GameArea = () => {
    const [games, setGames] = useState([]); // State to hold game data
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling
    const gamesPerPage = 8; // Number of games per page
    const [currentPage, setCurrentPage] = useState(0);

    // Fetch game data from the API when the component mounts
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await request.get('/api/getgame');
                setGames(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching games:', err);
                setError('Failed to load games. Please try again later.');
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(games.length / gamesPerPage) - 1));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const startIndex = currentPage * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const currentGames = games.slice(startIndex, endIndex);

    if (loading) return <p>Loading games...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.gameArea}>
            <h2 className={styles.heading}>Exclusive Games</h2>
            <div className={styles.gamesGrid}>
                {currentGames.map((game, index) => (
                    <Link to={`/games/${game.slug}`} key={index} className="game-item-link">
                    <div key={index} className={styles.gameCard}>
                        <img src={`http://localhost:5000/uploads/${game.img}`} loading="lazy" alt={game.title} className={styles.gameImage} />
                        <h3 className={styles.gameTitle}>{game.title}</h3>
                        <p className={styles.gameDeveloper}>{game.developer}</p>
                    </div>
                    </Link>
                ))}
            </div>
            <div className={styles.pagination}>
                <button
                    className={styles.prevButton}
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                >
                    ←
                </button>
                <span className={styles.pageNumber}>{currentPage + 1}</span>
                <button
                    className={styles.nextButton}
                    onClick={handleNextPage}
                    disabled={currentPage >= Math.ceil(games.length / gamesPerPage) - 1}
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default GameArea;
