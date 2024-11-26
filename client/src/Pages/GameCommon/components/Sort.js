import React from 'react';
import './Sort.scss';

function Sort({ onSortChange }) {
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    onSortChange(selectedSort); // Gọi hàm từ component cha khi người dùng chọn
  };

  return (
    <div className="sort">
      <select onChange={handleSortChange} defaultValue="">
        <option value="">Sort By</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>

      </select>
    </div>
  );
}

export default Sort;
