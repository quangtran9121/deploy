const mongoose = require('mongoose');

// Định nghĩa Schema cho Genres
const genresSchema = new mongoose.Schema({
    genres_id: {
        type: Number,
        unique: true,
        required: true,
        autoIncrement: true // MongoDB không có auto-increment mặc định
    },
    game_id: {
        type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến _id của Game
        ref: 'Game', // Tham chiếu đến model 'Game'
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {
    timestamps: true, // Thêm createdAt và updatedAt tự động
});

// Tạo model từ Schema
const Genres = mongoose.model('Genres', genresSchema);

module.exports = Genres;
