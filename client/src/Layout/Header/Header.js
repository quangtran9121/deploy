import React, { useState } from 'react';
import classNames from 'classnames/bind';
import logo from './img/Logo_XGame-011.png';
import styles from './Header.module.scss'; 
import Auth from "../../Pages/Login/Auth";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import request from '../../config/config';

const cx = classNames.bind(styles);

function Header() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const token = document.cookie;
    console.log(token);
    const navigate = useNavigate();

    const handleOpenAuth = () => {
        setIsAuthOpen(true);
    };

    const handleCloseAuth = () => {
        setIsAuthOpen(false);
    };

    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
        handleSearch(event.target.value);
    };

    const handleSearch = async (query) => {
        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
            const response = await request.post('/api/searchgame', {
                game_name: query,
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await request.delete('/api/logout');
            if (response.status === 200) {
                // Clear relevant cookies or local storage
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                // Redirect to home or login page
                navigate('/');
                window.location.reload(); // Refresh to reflect logout state
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <header className={cx('header')}>
            <div className={cx('header-left')}>
                <div className={cx('logo')}>
                    <Link to='/'>
                        <img src={logo} alt="Site Logo" />
                    </Link>
                </div>
            </div>

            {/* Menu chính */}
            <nav className={cx('nav', { 'nav-hidden': isMenuOpen })}>
                <ul className={cx('nav-list')}>
                    <li className={cx('nav-item')}>
                        <Link to='/games' className={cx('nav-link')}>Game</Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <a href="/" className={cx('nav-link')}>For Developers</a>
                    </li>
                    <li className={cx('nav-item')}>
                        <a href="/" className={cx('nav-link')}>About</a>
                    </li>
                    <li className={cx('nav-item')}>
                        <a href="/" className={cx('nav-link')}>Contact</a>
                    </li>
                </ul>
                <div className={cx('search-container')}>
                    <div className={cx('search')}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className={cx('search-input')}
                            value={searchInput}
                            onChange={handleSearchInput}
                            onBlur={() => {
                                setSearchInput(''); // Xóa dữ liệu khi mất tiêu điểm
                                setSearchResults([]); // Ẩn kết quả tìm kiếm khi mất tiêu điểm
                            }}
                        />
                        <button
                            className={cx('search-button')}
                            onClick={() => handleSearch(searchInput)}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    {searchResults.length > 0 && (
                        <div className={cx('search-results')}>
                            <ul>
                                {searchResults.map((game, index) => (
                                    <Link to={`/games/${game.slug}`} key={index} className="game-item-link">
                                        <li key={index} className={cx('search-result-item')}>
                                            <img 
                                                src={`${process.env.PUBLIC_URL}/uploads/${game.img}`} 
                                                loading="lazy"
                                                alt={game.game_name} 
                                                className={cx('game-thumbnail')}
                                            />
                                            <div className={cx('game-info')}>
                                                <p className={cx('game-developer')}>{game.developer}</p>
                                                <p className={cx('game-title')}>{game.game_name}</p>
                                            </div>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
            <div className={cx('header-right')}>
                {!token && (
                    <div className={cx('actions')}>
                        <button
                            className={cx('btn', 'login-btn')}
                            onClick={handleOpenAuth}
                        >
                            Login / Register
                        </button>
                    </div>
                )}
                {token && (
                    <div className={cx('user')}>
                        <Link to='/profile'>
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                        <button
                            className={cx('btn', 'logout-btn')}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Overlay */}
            {isMenuOpen && (
                <div
                    className={cx('overlay')}
                    onClick={() => setIsMenuOpen(false)} // Đóng menu khi nhấn vào overlay
                ></div>
            )}

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={cx('mobile-menu')}>
                    <ul>
                        <li><Link to='/games'>Game</Link></li>
                        <li><a href="/">For Developers</a></li>
                        <li><a href="/">About</a></li>
                        <li><a href="/">Contact</a></li>
                    </ul>
                </div>
            )}

            {isAuthOpen && (
                <div className={cx('auth-popup')}>
                    <div className={cx('auth-popup-overlay')} onClick={handleCloseAuth} />
                    <div className={cx('auth-popup-content')}>
                        <Auth onClose={handleCloseAuth} />
                    </div>
                </div>
            )}

            <div className={cx('hamburger-menu')} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </div>
        </header>
    );
}

export default Header;
