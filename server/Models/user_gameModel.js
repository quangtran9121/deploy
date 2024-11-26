const mongoose = require('mongoose');

// Định nghĩa Schema cho UserGameModel
const userGameSchema = new mongoose.Schema({
    user_game_id: {
        type: Number,
        unique: true,
        required: true,
        autoIncrement: true // MongoDB không có auto-increment, cần sử dụng logic tùy chỉnh nếu cần.
    },
    game_id: {
        type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến _id của Game
        ref: 'Game', // Tham chiếu đến model 'Game'
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến _id của User
        ref: 'User', // Tham chiếu đến model 'User'
        required: true
    },
    lastlog: {
        type: Date,
        default: Date.now // Giá trị mặc định là ngày hiện tại
    }
}, {
    timestamps: true, // Thêm các trường createdAt và updatedAt tự động
});

// Tạo model từ Schema
const UserGame = mongoose.model('UserGame', userGameSchema);

module.exports = UserGame;
