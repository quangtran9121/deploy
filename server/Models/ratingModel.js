const mongoose = require('mongoose');

// Định nghĩa Schema cho Review
const ratingSchema = new mongoose.Schema({
    email: {
        type: String, // Tham chiếu đến _id của User
        ref: 'User', // Tham chiếu đến model 'User'
        required: true
    },
    slug: {
        type: String, // Tham chiếu đến _id của Game
        ref: 'Game', // Tham chiếu đến model 'Game'
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, {
    timestamps: true, // Thêm các trường createdAt và updatedAt tự động
});

// Tạo model từ Schema
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
