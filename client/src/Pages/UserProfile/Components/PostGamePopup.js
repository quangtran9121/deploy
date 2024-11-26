// src/components/PostGamePopup.js
import React, { useState } from 'react';
import './PostGamePopup.scss';
import { ModalDeleteGame, ModalAddGame, ModalEditGame } from '../../Admin/Modal/Modal';

function PostGamePopup({ 
    isOpen, 
    onClose, 
    onPost, 
    handleShowModalAddGame, 
    show,
    setShow,


}) {
    const [gameTitle, setGameTitle] = useState('');
    const [description, setDescription] = useState('');

    if (!isOpen) return null;

    const handlePost = () => {
        onPost({ gameTitle, description });
        onClose();
    };

    return (
        <div className="post-game-popup">
            <div className="popup-content">
                <h3>Post a Game</h3>
                <input type="text" value={gameTitle} onChange={(e) => setGameTitle(e.target.value)} placeholder="Game Title" />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                <button onClick={handleShowModalAddGame}>Post</button>
                <button onClick={onClose} className="close-button">Close</button>
            </div>
            <ModalAddGame show={show} setShow={setShow} />
        </div>
    );
}

export default PostGamePopup;
