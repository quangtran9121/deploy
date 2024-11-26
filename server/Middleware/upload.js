const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Đảm bảo đường dẫn đến thư mục 'uploads' đúng
const uploadDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir);
// }

// Cấu hình 'multer' để lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Sử dụng đường dẫn đã tạo cho 'uploads'
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});
const upload = multer({ storage });

module.exports = upload;