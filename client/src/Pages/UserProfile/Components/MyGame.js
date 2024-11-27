// src/components/MyGames.js
import React from 'react';
import './MyGame.scss'; // Use the same CSS file for styling
import { Link } from 'react-router-dom';

function MyGames({ games, setShowEditModal, setShowDeleteModal, setSelectedGame }) {
    const handleEdit = (game) => {
        setSelectedGame(game);
        setShowEditModal(true);
    };

    const handleDelete = (game) => {
        setSelectedGame(game);
        setShowDeleteModal(true);
    };

    return (
        
        <div className="my-games">
            <h3>My Games</h3>
            <div className="game-carousel">
                {games.map((game, index) => (
                    <div key={index} className="game-item">
                        <Link to={`/games/${game.slug}`} className="game-item-link">
                            <img
                                src={`http://45.77.32.24:5000/uploads/${game.img}`}
                                alt={game.title}
                                loading="lazy"
                                className="game-image"
                            />
                            <div className="game-title" title={game.game_name}>
                                {game.game_name.length > 20 ? `${game.game_name.substring(0, 17)}...` : game.game_name}
                            </div>
                        </Link>
                        <div className="game-actions">
                            <button onClick={() => handleEdit(game)} className="edit-button">Update</button>
                            <button onClick={() => handleDelete(game)} className="delete-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    
    );
}

export default MyGames;
