import React, { useState } from 'react';
import './GameCarousel.scss';
import { Link } from 'react-router-dom';

function GameCarousel({ games }) {
  const gamesPerPage = 30; // Số game tối đa trên mỗi trang
  const [currentPage, setCurrentPage] = useState(0); // State cho trang hiện tại

  // Tính toán chỉ số bắt đầu và kết thúc dựa trên trang hiện tại
  const startIndex = currentPage * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;

  // Các game hiển thị trên trang hiện tại
  const currentGames = games.slice(startIndex, endIndex);

  // Xử lý chuyển sang trang trước
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  // Xử lý chuyển sang trang tiếp theo
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(games.length / gamesPerPage) - 1));
  };

  return (
    <div className="game-carousel-container">
      <div className="game-carousel">
        {currentGames.map((game, index) => (
          <Link to={`/games/${game.slug}`} key={index} className="game-item-link">
            <div className="game-item">
              <img
                src={`http://45.77.32.24:5000/uploads/${game.img}`}
                loading="lazy"
                alt={game.title}
                className="game-image"
              />
              <div className="game-title">{game.game_name}</div>
              <div className="game-developer">{game.developer}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Phân trang */}
      <div className="pagination">
        <button
          className="pagination-btn prev"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          ←
        </button>
        <span className="pagination-info">
          Page {currentPage + 1} of {Math.ceil(games.length / gamesPerPage)}
        </span>
        <button
          className="pagination-btn next"
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(games.length / gamesPerPage) - 1}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default GameCarousel;
