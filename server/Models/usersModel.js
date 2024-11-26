const mongoose = require('mongoose');

// Định nghĩa Schema cho Users
const userSchema = new mongoose.Schema({
    // user_id: {
    //     type: Number,
    //     unique: true,
    //     autoIncrement: true, // MongoDB không tự động auto-increment, nên cần thêm logic cho việc này nếu cần
    // },
    googleId: {
        type: String,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isactive: {
        type: Boolean,
        default: true,
    },
    avatar: {
        type: String,
    },
    date_of_birth: {
        type: Date,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isPublisher: {
        type: Boolean,
        default: false,
    },
    isDeveloper: {
        type: Boolean,
        default: false,
    },
    country: {
        type: String,
    },
    bio: {
        type: String,
    },
    companyName: {
        type: String,
    },
    website: {
        type: String,
    },
    expectedTraffic: {
        type: String,
        enum: ['< 50K visits per month', '50K - 100K visits per month', '100K - 500K visits per month', '500K - 1M visits per month', '1M - 10M visits per month'],
    },
    resetToken: {
        type: String,
    },
    resetOTP: {
        type: String,
    },
    resetTokenExpiration: {
        type: Number,
    },
}, {
    timestamps: true, // Thêm createdAt và updatedAt tự động
});

// Tạo model từ Schema
const Users = mongoose.models.Users || mongoose.model('Users', userSchema);

module.exports = Users;
