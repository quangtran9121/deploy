import classNames from 'classnames/bind';
// import styles from './HeaderAdmin.module.scss';
import styles from './HeaderAdmin.module.scss';
import { useNavigate, Link } from 'react-router-dom';

import request from '../../../../config/config';
import { useRef, useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function HeaderAdmin() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef(); // Tham chiếu đến vùng tìm kiếm

    const handleSearchResults = async (e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
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
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                navigate('/');
                window.location.reload();
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleOutsideClick = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setSearch('');
            setSearchResults([]);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div>
            <header className={cx('navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow')}>
                <a className={cx('navbar-brand col-md-3 col-lg-2 me-0 px-3')} href="/admin">
                    Quản Trị Admin
                </a>
                <button
                    className={cx('navbar-toggler position-absolute d-md-none collapsed')}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className={cx('navbar-toggler-icon')}></span>
                </button>
                <input
                        className={cx('form-control form-control-dark w-100')}
                        type="text"
                        value={search}
                        onChange={handleSearchResults}
                        placeholder="Search game"
                        aria-label="Search"
                    />
                <div ref={searchRef} className={cx('search-container')}>
                   
                    {searchResults.length > 0 && (
                        <div className={cx('search-results-admin')}>
                            <ul>
                                {searchResults.map((game, index) => (
                                    <Link to={`/games/${game.slug}`} key={index} className="game-item-link">
                                        <li key={index} className={cx('search-result-item')}>
                                            <img
                                                src={`http://localhost:5000/uploads/${game.img}`}
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

                <div className={cx('navbar-nav')}>
                    <div onClick={handleLogout} className={cx('nav-item text-nowrap')}>
                        <a className={cx('nav-link px-3')} href="#/">
                            Sign out
                        </a>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default HeaderAdmin;