const mongoose = require('mongoose');
const Genres = require('./genresModel');



// Định nghĩa Schema cho Games
const gameSchema = new mongoose.Schema({
    game_id: {
        type: Number,
        unique: true,
        required: true,
        autoIncrement: true // MongoDB không có auto-increment mặc định, bạn sẽ cần tự thêm logic nếu cần.
    },
    email: {
        type: String, // Tham chiếu đến _id của User
    },
    game_name: {
        type: String,
        // required: true,
    },
    slug: { 
        type: String, 
        unique: true, 
    },
    img: {
        type: String,
        require: true,
    },
    developer: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
        required: true,
    },
    release_date: {
        type: Date,
    },
    play_count: {
        type: Number,
        default: 0,
    },
    create_at: {
        type: Date,
        default: Date.now, // Thời gian hiện tại
    },
    update_at: {
        type: Date,
        default: Date.now, // Thời gian hiện tại
    },
    languages: {
        type: String,
        required: true,
    },
    players: {
        type: String,
        enum: ['multi-players', 'single-player', 'co-op'],
        // required: true,
    },
    expectedTraffic: {
        type: String,
        enum: ['<50K visits per month', '50K - 100K visits per month', '100K - 500K visits per month', '500K - 1M visits per month', '1M - 10M visits per month'],

    },
    mobile_compatible: {  
        type: String,
        enum: ['Desktop Only', 'For Android', 'For IOS', 'For Both'],
        required: true,
    },
    tag: {
        type: String,
    },
    genres: {
        type: String,
    },
    rating: { 
        type: Number, 
        default: 0 
    },

}, {
    timestamps: false, // Không tạo createdAt và updatedAt tự động
});


// Tạo model từ Schema
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;





