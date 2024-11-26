// src/pages/UserProfile.js
import React, { useState, useEffect } from 'react';
import ProfileHeader from './Components/ProfileHeader';
import GameStatistics from './Components/GameStatistics';
import SocialLinks from './Components/SocialLinks';
import EditProfile from './Components/EditProfile';
import './UserProfile.scss';
import Header from '../../Layout/Header/Header';
import Footer from '../../Layout/Footer/Footer';
import MyGames from './Components/MyGame';
import request from '../../config/config';
import {jwtDecode} from 'jwt-decode';
import { ModalDeleteGame, ModalEditGame, ModalAddGame } from '../Admin/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
    const [showAddGameModal, setShowAddGameModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [games, setGames] = useState([]); // Danh sách các game của người dùng
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [gamesPlayed, setGamesPlayed] = useState([]); // Danh sách các game đã chơi của người dùng

    // Lấy token từ cookies và giải mã để lấy email
    const token = document.cookie;
    const decode = token ? jwtDecode(token.split('=')[1]) : null;
    const userEmail = decode ? decode.email : null;

    // Hàm gọi API để lấy thông tin người dùng và các game đã chơi
    const fetchUserProfileAndGames = async () => {
        if (userEmail) {
            try {
                setLoading(true);

                // Lấy thông tin hồ sơ người dùng
                const userProfileResponse = await request.post('/api/userprofile', { email: userEmail });
                const { user } = userProfileResponse.data;
                setUser(user);

                // Lấy danh sách các game đã chơi
                const gamesPlayedResponse = await request.get('/api/getgamesplayed', {
                    params: { email: userEmail },
                });
                setGamesPlayed(gamesPlayedResponse.data.gamesPlayed);

                // Lấy danh sách các game của người dùng
                const userGamesResponse = await request.get(`/api/mygame?email=${encodeURIComponent(userEmail)}`);
                setGames(userGamesResponse.data);
            } catch (error) {
                console.error('Error fetching user data or games:', error);
                // toast.error('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        } else {
            console.error('User email not found in token');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfileAndGames();
    }, [userEmail, showAddGameModal, showDeleteModal, showEditModal]);

    const handleEditSave = async (updatedInfo) => {
        try {
            setUser((prevUser) => ({ ...prevUser, ...updatedInfo }));
            toast.success('Profile updated successfully');
            await fetchUserProfileAndGames(); // Refetch data after updating
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }
    };

    const handleAvatarChange = async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('email', userEmail); // Include the email with the avatar file
    
        try {
            const response = await request.post('/api/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUser((prevUser) => ({ ...prevUser, avatar: response.data.avatar }));
            // toast.success('Avatar updated successfully');
        } catch (error) {
            console.error('Error updating avatar:', error);
            // toast.error('Failed to update avatar');
        }
    };
    

    const handlePostGame = async (game) => {
        try {
            setGames((prevGames) => [...prevGames, game]);
            toast.success('Game posted successfully');
            await fetchUserProfileAndGames(); // Refetch data after posting a new game
        } catch (error) {
            console.error('Error posting game:', error);
            toast.error('Failed to post game');
        }
    };

    const handleDeleteGame = async (game) => {
        try {
            setGames((prevGames) => prevGames.filter((g) => g.game_id !== game.game_id));
            toast.success('Game deleted successfully');
            await fetchUserProfileAndGames(); // Refetch data after deleting a game
        } catch (error) {
            console.error('Error deleting game:', error);
            toast.error('Failed to delete game');
        }
    };

    const handleCloseModalAddGame = () => {
        setShowAddGameModal(false);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Header />
            <ToastContainer />
            <div className="user-profile-page">
                {/* Left Column */}
                <div className="left-column">
                    <ProfileHeader user={user} onAvatarChange={handleAvatarChange} />
                    <EditProfile user={user} onSave={handleEditSave} />
                    <SocialLinks links={user ? user.socialLinks : ''} />
                </div>

                {/* Right Column */}
                <div className="right-column">
                    {/* Truyền danh sách các game đã chơi cho GameStatistics */}
                    <GameStatistics games={gamesPlayed} />
                    {(decode.admin || decode.developer || decode.publisher) && (
                        <MyGames
                            games={games}
                            setShowEditModal={setShowEditModal}
                            setShowDeleteModal={setShowDeleteModal}
                            setSelectedGame={setSelectedGame}
                        />
                    )}
                    <div className="post-game-button-container">
                        {(decode.admin || decode.developer || decode.publisher) && (
                            <button onClick={() => setShowAddGameModal(true)} className="post-game-button">
                                Post a New Game
                            </button>
                        )}
                    </div>
                </div>

                {/* Modal for Adding a New Game */}
                <ModalAddGame show={showAddGameModal} setShow={setShowAddGameModal} onPost={handlePostGame} onClose={handleCloseModalAddGame} />

                {/* Modal for Deleting a Game */}
                {showDeleteModal && selectedGame && (
                    <ModalDeleteGame
                        showModalDelete={showDeleteModal}
                        setShowModalDelete={setShowDeleteModal}
                        game_id={selectedGame ? selectedGame.game_id : null}
                    />
                )}

                {/* Modal for Editing a Game */}
                {showEditModal && selectedGame && (
                    <ModalEditGame
                        showModalEdit={showEditModal}
                        setShowModalEdit={setShowEditModal}
                        game_id={selectedGame ? selectedGame.game_id : null}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
}

export default UserProfile;
