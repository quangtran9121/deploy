const jwt = require('jsonwebtoken'); // Đảm bảo bạn đã import jwt
const jwtSecret = process.env.JWT_SECRET; // Sử dụng biến môi trường cho khóa bí mật

const AuthMiddleware = {
    verifyToken: (req, res, next) => {
        const authHeader = req.cookies.Token;
        // console.log('Auth Header:', authHeader);

        // Kiểm tra token có tồn tại trong header hay không
        if (authHeader) {
            // console.log('Đây là token của AuthMiddleware: ' + authHeader);

            // Xác thực token
            jwt.verify(authHeader, jwtSecret, (err, user) => {
                if (err) {
                    // console.error('Token verify error:', err);
                    return res.status(403).json({ message: 'Bạn cần thực hiện đăng nhập!' });
                }
                req.user = user; // Gán thông tin user vào request
                // console.warn(user);
                next(); // Chuyển tiếp yêu cầu
            });
        } else {
            // console.warn('Token không được cung cấp!');
            return res.status(401).json({ message: 'Bạn cần thực hiện đăng nhập!' });
        }
    },

    verifyAdmin: (req, res, next) => {
        // Kiểm tra quyền admin từ thông tin user
        if (req.user && req.user.admin) {
            next();
        } else {
            // console.warn('Quyền admin không hợp lệ!');
            return res.status(403).json({ message: 'Bạn không có quyền thực hiện hành động này!' });
        }
    }
};

module.exports = AuthMiddleware;
