// src/components/GameDetailsHeader.js
import React from 'react';
import './GameDetailsHeader.scss';

function GameDetailsHeader({ game }) {
    return (
        <div className="game-details-header">
            <div className="header-buttons">
                <button className="share-button">Share</button>
                <button className="open-button">Open in a new tab</button>
            </div>
            <div className="details-content">
                <h2> Game Title: <strong>{ game.game_name} </strong></h2>
                
                <p>
                    Published by:<strong><a href={game.publisherLink} target="_blank" rel="noopener noreferrer">{game.publisher}</a></strong> 
                </p>
                <p>
                    Language:<strong>{game.languages || 'N/A'}</strong> 
                </p>
                <div className="details-row">   
                    <div className="details-items">
                        <h2>Description: </h2>
                        <p>{game.description}</p>
                    </div>
                    {/* <div className="details-item">
                        <strong>Gender:</strong> 
                        {game.gender.map((g, index) => (
                            <span key={index} className="badge">{g}</span>
                        ))}
                    </div>
                    <div className="details-item">
                        <strong>Age Group:</strong> 
                        {game.ageGroup.map((age, index) => (
                            <span key={index} className="badge">{age}</span>
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default GameDetailsHeader;
