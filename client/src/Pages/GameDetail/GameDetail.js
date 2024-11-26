import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SimilarGames from './Components/SimilarGame';
import request from '../../config/config';
import './GameDetail.scss';
import Header from '../../Layout/Header/Header';
import {jwtDecode} from 'jwt-decode'; // Sửa tên import
import Footer from '../../Layout/Footer/Footer';
import GameDetailsHeader from './Components/GameDetailsHeader';
import Rating from './Components/Rating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommentSection from './Components/Comment';

const fetchGameDetails = async (slug) => {
    try {
        const response = await request.get(`/api/gamedetail/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching game details:", error);
        return null;
    }
};


function GameDetail() {
    const { slug } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState(null);
 // Lưu giá trị đánh giá của người dùng

    const loadGame = async () => {
        setLoading(true);
        const gameData = await fetchGameDetails(slug);
        setGame(gameData);
        setLoading(false);
    };



    useEffect(() => {
        const token = document.cookie;
        const decodedToken = token ? jwtDecode(token.split('=')[1]) : null;
        setUserEmail(decodedToken ? decodedToken.email : null);

        loadGame();
    }, [slug]);



    const handlePlayNow = async () => {
        try {
            const res = await request.post('/api/counter', { slug });
            const response = await request.post('/api/gamesplayed', {
                email: userEmail,
                slug,
            });

            if (response.status === 200) {
                toast.success(response.data.message); // Thông báo thành công
            }
        } catch (error) {
            console.error("Người chơi không đăng nhập!", error);
        }
    };

    
    if (loading) return <p>Loading...</p>;
    if (!game) return <p>Game not found.</p>;

    return (
        <div>
            <ToastContainer />
            <header>
                <Header />
            </header>
            <div className="game-detail-container">
                <div className="left-column">
                    <div className="main-content">
                        <div className="game-header">
                            <img src={`http://localhost:5000/uploads/${game.img}`} loading="lazy" alt="Game Icon" className="game-icon" />
                            <h1>{game.game_name}</h1>
                            <p className="game-publisher">by {game.publisher}</p>
                            <button className="play-button" onClick={handlePlayNow}>Play Now</button>
                        </div>
                    </div>
                    <div className="Rating-container">
                        <Rating slug={slug} userEmail={userEmail}/>
                    </div>
                    <div className="GameDetailsHeader-container">
                        <GameDetailsHeader game={game} />
                    </div>

                    <CommentSection slug={slug} userEmail={userEmail} />
                </div>
                <div className="right-column">
                    <div className="similar-games-container">
                        <SimilarGames currentGenres={game.genres} currentSlug={game.slug} />
                    </div>
                    <div className="game-details-container">
                        <div className="game-details">
                            <p><strong>Published:</strong> {game.published}</p>
                            <p><strong>Last Updated:</strong> {game.update_at}</p>
                            <p><strong>Type:</strong> {game.title}</p>
                            <p><strong>Subtype:</strong> {game.subtype}</p>
                            <p><strong>Screen Orientation:</strong> {game.screenOrientation}</p>
                            <p><strong>Dimensions:</strong> {game.dimensions}</p>
                            <p><strong>Company:</strong> {game.company}</p>
                        </div>
                        <div className="game-genres">
                            <h4>Genres</h4>
                            {game.genres ? (
                                <span className="genre-tag">{game.genres}</span>
                            ) : (
                                <p>No genres available</p>
                            )}
                        </div>
                        <div className="game-tags">
                            <h4>Tags</h4>
                            {game.tags ? (
                                <span className="tag">{game.tags}</span>
                            ) : (
                                <p>No tags available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default GameDetail;
