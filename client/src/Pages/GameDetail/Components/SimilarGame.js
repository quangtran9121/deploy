import React, { useState, useEffect } from 'react';
import request from '../../../config/config'; // Import your request configuration
import './SimilarGame.scss';
import { Link } from 'react-router-dom';
function SimilarGames({ currentGenres, currentSlug }) {
    const [similarGames, setSimilarGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSimilarGames = async () => {
            try {
                // Gọi API để lấy danh sách các game tương tự
                const response = await request.post('/api/similargame', { genres: currentGenres, slug: currentSlug });
                setSimilarGames(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching similar games:', err);
                setError('Failed to load similar games');
                setLoading(false);
            }
        };

        // Chỉ gọi API khi `currentGenres` có giá trị
        if (currentGenres && currentGenres.length > 0) {
            fetchSimilarGames();
        }
    }, [currentGenres]);
    if (similarGames.length===0) return <p> No similar games found. </p>
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="similar-games">
            <h2>Similar Games</h2>
            <div className="similar-games-list">
                {similarGames.length > 0 ? (
                    similarGames.map((game, index) => (
                        <Link to={`/games/${game.slug}`} key={index} className="game-item-link">
                        <div key={index} className="game-item">
                            <img src={`https://quangtt.backendintern.online/uploads/${game.img}`} loading="lazy" alt={game.title} className="game-image" />
                            <p className="game-title">{game.game_name}</p>
                            <p className="game-publisher">{game.developer}</p>
                        </div>
                        </Link>
                    ))
                ) : (
                    <p>No similar games found.</p>
                )}
            </div>
        </div>
    );
}

export default SimilarGames;
