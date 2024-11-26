// src/components/GameStatistics.js
import React from 'react';
import './GameStatistics.scss';
import { Link } from 'react-router-dom';

function GameStatistics({ games }) {
    return (
        <div className="game-statics">
            <h3>Games Played</h3>
            <div className="game-carousel">
                {games.map((game, index) => (
                    <div key={index} className="game-items">
                    <Link to={`/games/${game.slug}`} className="game-item-link">
                        <img
                            src={`http://localhost:5000/uploads/${game.img}`}
                            loading="lazy"
                            alt={game.title}
                            className="game-image"
                        />
                        <div className="game-title" title={game.game_name}>
                            {game.game_name.length > 20 ? `${game.game_name.substring(0, 17)}...` : game.game_name}
                        </div>
                    </Link>
                </div> // Hiển thị từng `slug` trong danh sách
                ))}


            </div>
        </div>
    );
}

export default GameStatistics;
