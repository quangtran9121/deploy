const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: true,
        maxlength: 1000 // Giới hạn độ dài bình luận nếu cần
    }
}, {
    timestamps: true 
});

// Tạo model từ schema
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
