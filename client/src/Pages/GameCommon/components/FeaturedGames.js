import React, { useState, useEffect } from 'react';
import './FeaturedGames.scss';
import request from '../../../config/config';
import { Link } from 'react-router-dom';

function FeaturedGames() {
    const [categories, setCategories] = useState([]); // Lưu các danh mục từ API
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [currentIndexes, setCurrentIndexes] = useState({}); // Lưu chỉ số hiện tại của từng danh mục

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await request.get('/api/categories');
                const fetchedCategories = response.data.categories;

                const initialIndexes = {};
                fetchedCategories.forEach((_, index) => {
                    initialIndexes[index] = 0;
                });

                setCategories(fetchedCategories);
                setCurrentIndexes(initialIndexes);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleNext = (categoryIndex) => {
        setCurrentIndexes((prevIndexes) => ({
            ...prevIndexes,
            [categoryIndex]: (prevIndexes[categoryIndex] + 1) % categories[categoryIndex].games.length,
        }));
    };

    const handlePrevious = (categoryIndex) => {
        setCurrentIndexes((prevIndexes) => ({
            ...prevIndexes,
            [categoryIndex]:
                (prevIndexes[categoryIndex] - 1 + categories[categoryIndex].games.length) %
                categories[categoryIndex].games.length,
        }));
    };

    return (
        <div className="featured-games-container">
            {categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="category-section">
                    <h2 className="category-title">{category.title}</h2>
                    {category.games && category.games.length > 0 ? (
                        <Link
                            to={`/games/${category.games[currentIndexes[categoryIndex]]?.slug || ''}`}
                            key={categoryIndex}
                            className="game-item-link"
                        >
                            <div className="category-games">
                                <div className="featured-game-card">
                                    <img
                                        src={`http://backend:5000/uploads/${category.games[currentIndexes[categoryIndex]]?.img || 'placeholder.jpg'}`}
                                        loading="lazy"
                                        alt=""
                                        className="featured-game-image"
                                    />
                                    <div className="featured-game-overlay">
                                        <div className="navigation-arrows">
                                            <button
                                                className="nav-arrow"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePrevious(categoryIndex);
                                                }}
                                            >
                                                &lt;
                                            </button>
                                            <button
                                                className="nav-arrow"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleNext(categoryIndex);
                                                }}
                                            >
                                                &gt;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <p>No games available in this category.</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default FeaturedGames;
