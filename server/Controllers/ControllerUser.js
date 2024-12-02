const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const Users = require('../Models/usersModel');
const Game = require('../Models/gamesModel');
const History = require('../Models/historyModel');
const Rating = require('../Models/ratingModel');
const Comment = require('../Models/commentModel');
const sendEmail = require('./ControllerEmail/ControllerForgotPassword');
const crypto = require('crypto');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;


class UserController{
//Đăng ký
    async Register(req,res){
        const { 
            firstName, 
            lastName, 
            email, 
            password,
            country, 
            website,
            companyName, 
            expectedTraffic,
            isPublisher, 
            isDeveloper 
        } = req.body;
    
        // Kiểm tra và xử lý thông tin đăng ký
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Các trường không được để trống!' });
        }
        const saltRounds = 10;
        try{
            const dataUser = await Users.findOne({ email:  email  });
            if (dataUser) {
                return res.status(409). json({message: 'Người dùng đã tồn tại!'});
            } else {
                const passwordHash = await bcrypt.hash(password, saltRounds);
                const newUser = new Users({
                    firstName, 
                    lastName, 
                    email, 
                    password: passwordHash,
                    country, 
                    website,
                    companyName,
                    expectedTraffic, 
                    isPublisher, 
                    isDeveloper                     
                });
                await newUser.save();
                res.status(201).json({message: 'Đăng ký thành công!'})
            }
        } catch (error){
            console.error(error);
            res.status(500).json({message: 'Đã xảy ra lỗi trong quá trình đăng ký!'})
        }
    };
//Đăng nhập
    async Login(req, res){
        const { email, password } = req.body;
        const dataUser = await Users.findOne({email});
        if (!dataUser){
            return res.status(401).json({message:'Email hoặc mật khẩu không chính xác!'})
        }
        if (dataUser.isactive === false) return res.status(401).json({message:'Tài khoản đã bị vô hiệu hóa, bạn không có quyền đăng nhập!'})
        const match = await bcrypt.compare(password, dataUser.password);
        if (match){
            const admin = dataUser.isAdmin;
            const publisher = dataUser.isPublisher;
            const developer = dataUser.isDeveloper;
            const token = jwt.sign({email, admin, publisher, developer}, jwtSecret, {expiresIn: '24h'});
            res.setHeader('Set-Cookie',`Token=${token}; SameSite=None; Secure; max-age=18000; path=/`).json({
                message:'Đăng nhập thành công!'  
            })

            const check = req.cookies.Token;
            console.log(check);
            console.log(token);
        } else {
            return res.status(401).json({message:'Email hoặc mật khẩu không chính xác!'})
        }
    }
//Quên mật khẩu

//Đăng xuất 
    async Logout(req, res) {
        const token = '';
        res.setHeader('Set-Cookie', `Token=${token}; max-age=0; path=/`);
        return res.json({ message: 'Đã đăng xuất!' });
    }

//Lấy thông tin chi tiết người dùng
    async GetDataAuth(req, res) {
        const token = req.cookies;
        const decoded = jwtDecode(token.Token);
        Users.findOne({ email: decoded.email }).then((dataUser) => res.status(200).json({ dataUser }));
    }

    async GetUserProfile(req, res) {
        try {
            const { email } = req.body;
            // console.log(email);
            // Step 1: Retrieve user information based on email
            const user = await Users.findOne({ email });
            console.log(user);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Step 2: Retrieve history information based on user_id
            const history = await History.findOne({ user_id: user._id });
            if (!history || history.game_id.length === 0) {
                return res.status(200).json({
                    user,
                    gamesPlayed: [],
                    gamesPlayedCount: 0,
                    message: 'No games played yet',
                });
            }
    
            // Step 3: Retrieve game details based on game_ids in history
            const gamesPlayed = await Game.find({ game_id: { $in: history.game_id } });
            const gamesPlayedCount = history.game_id.length;
    
            // Step 4: Respond with user details and games played
            res.status(200).json({
                user,
                gamesPlayed,
                gamesPlayedCount,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    };
//Quản lý game đã đăng
    async GetMyGame(req,res){
        try {
            const email = req.query.email;
            if (!email) {
                return res.status(401).json({ message: 'Authorization token is required.' });
            }
            const mygame = await Game.find({email});
            if (mygame.length ===0) {
                return res.status(500).json({message: 'No games posted yet.'})
            } else {
                return res.status(200).json(mygame)
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Internal server!'})
        }
    }
    
    async ChangePassword(req, res) {
        try {
            const { email, password, newpassword, repassword } = req.body;
    
            // Validate if the new password matches the repeated password
            if (newpassword !== repassword) {
                return res.status(400).json({ message: 'Mật khẩu mới và xác nhận mật khẩu không khớp!' });
            }
    
            // Find the user by email
            const dataUser = await Users.findOne({ email });
    
            if (!dataUser) {
                return res.status(404).json({ message: 'Người dùng không tồn tại!' });
            }
    
            // Check if the current password matches the stored password
            const isMatch = await bcrypt.compare(password, dataUser.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Mật khẩu hiện tại không chính xác!' });
            }
    
            // Check if the new password is the same as the current password
            const isSamePassword = await bcrypt.compare(newpassword, dataUser.password);
            if (isSamePassword) {
                return res.status(400).json({ message: 'Mật khẩu mới không được trùng với mật khẩu hiện tại!' });
            }
    
            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newpassword, salt);
    
            // Update the user's password
            dataUser.password = hashedPassword;
            await dataUser.save();
    
            return res.status(200).json({ message: 'Đổi mật khẩu thành công!' });
        } catch (error) {
            console.error('Error changing password:', error);
            return res.status(500).json({ message: 'Đã xảy ra lỗi khi đổi mật khẩu.' });
        }
    }

    // async ChangePassword(req, res) {
    //     try {
    //         const { email, newpassword } = req.body;
    
    //         // Find the user by email
    //         const dataUser = await Users.findOne({ email });
    
    //         if (!dataUser) {
    //             return res.status(404).json({ message: 'Người dùng không tồn tại!' });
    //         }
    //         // Hash the new password
    //         const salt = await bcrypt.genSalt(10);
    //         const hashedPassword = await bcrypt.hash(newpassword, salt);
    
    //         // Update the user's password
    //         dataUser.password = hashedPassword;
    //         await dataUser.save();
    
    //         return res.status(200).json({ message: 'Đổi mật khẩu thành công!' });
    //     } catch (error) {
    //         console.error('Error changing password:', error);
    //         return res.status(500).json({ message: 'Đã xảy ra lỗi khi đổi mật khẩu.' });
    //     }
    // }
    
    async EditProfile(req, res) {
        try {
            const { firstName, lastName, email, country, website, companyName } = req.body;
            
            // Find the user by email
            const dataUser = await Users.findOne({ email });
            if (!dataUser) {
                return res.status(404).json({ message: "Người dùng không tồn tại!" });
            }
    
            // Update the user's profile fields
            dataUser.firstName = firstName || dataUser.firstName;
            dataUser.lastName = lastName || dataUser.lastName;
            dataUser.country = country || dataUser.country;
            dataUser.website = website || dataUser.website;
            dataUser.companyName = companyName || dataUser.companyName;
    
            // Save the updated user profile
            await dataUser.save();
    
            // Send success response
            return res.status(200).json({ message: "Cập nhật hồ sơ thành công!" });
        } catch (error) {
            console.error("Error updating profile:", error);
            return res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật hồ sơ." });
        }
    }
    
    async ChangeAvt(req, res) { 
        try {
            const {email} = req.body; // Assuming you get user ID from the token
            const avatarPath = req.file.filename;

            // Find the user and update their avatar
            const user = await Users.findOne({email});
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.avatar = avatarPath;
            await user.save();

            return res.status(200).json({ message: 'Avatar updated successfully', avatar: avatarPath });
        } catch (error) {
            console.error('Error updating avatar:', error);
            return res.status(500).json({ message: 'Error updating avatar' });
        }
    };
    

    async GamesPlayed(req, res) {
        try {
            const { email, slug } = req.body;
    
            // Kiểm tra nếu không có `email` hoặc `slug`
            if (!email || !slug) {
                return res.status(400).json({ message: 'Thiếu email hoặc slug.' });
            }
    
            // Kiểm tra xem lịch sử của người dùng đã tồn tại chưa
            let history = await History.findOne({ email });
    
            if (history) {
                // Nếu `slug` đã tồn tại trong lịch sử, không thêm nữa
                if (!history.slug.includes(slug)) {
                    history.slug.push(slug); // Thêm `slug` vào mảng nếu chưa tồn tại
                    await history.save(); // Cập nhật nếu đã tồn tại
                }
            } else {
                // Nếu không có lịch sử nào cho email này, tạo mới
                history = new History({
                    email: email,
                    slug: [slug],
                });
                await history.save(); // Lưu lại document mới
            }
    
            res.status(200).json({ message: 'Cập nhật lịch sử chơi thành công' });
        } catch (error) {
            console.error("Error updating game history:", error);
            res.status(500).json({ message: 'Lỗi khi cập nhật lịch sử chơi' });
        }
    }
    

    async getGamesPlayed(req, res) {
        try {
            const { email } = req.query; // Lấy email từ query parameters
    
            // Tìm lịch sử chơi của người dùng theo email
            const history = await History.findOne({ email });
    
            if (!history) {
                // Nếu không có lịch sử nào, trả về thông báo
                return res.status(404).json({ message: 'Không tìm thấy lịch sử chơi của người dùng' });
            }
    
            // Tìm tất cả các game dựa trên danh sách slug
            const gamesPlayedDetails = await Game.find({ slug: { $in: history.slug } });
    
            // Trả về danh sách các game đã chơi với đầy đủ thông tin
            res.status(200).json({
                message: 'Lấy lịch sử chơi thành công',
                gamesPlayed: gamesPlayedDetails, // Danh sách game với đầy đủ thông tin
            });
        } catch (error) {
            console.error("Error fetching game history:", error);
            res.status(500).json({ message: 'Lỗi khi lấy lịch sử chơi' });
        }
    }



    async GetRating(req, res){
        try {
            const { slug } = req.query;
            var game = await Game.findOne({slug});
            if (game) return res.status(200).json(game.rating)

        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Lỗi tìm đánh giá!"})
        }
    }
    
    async Rating(req, res) {
        try {
            const { email, slug, rating } = req.body;
    
            // Kiểm tra người dùng đã đăng nhập chưa
            if (!email) {
                return res.status(401).json({ message: 'Cần đăng nhập để thực hiện đánh giá!' });
            }
    
            // Kiểm tra xem người dùng đã có đánh giá cho game này chưa
            let review = await Rating.findOne({ email, slug });
    
            if (review) {
                // Nếu đã có đánh giá, kiểm tra rating được gửi lên
                if (rating === '') {
                    return res.status(200).json({ message: 'Bạn đã đánh giá game này.', review });
                }
    
                // Cập nhật rating nếu có giá trị mới
                review.rating = rating;
                await review.save();
    
                // Tính toán và cập nhật giá trị trung bình
                const reviews = await Rating.find({ slug });
                const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
                const averageRating = totalRating / reviews.length;
    
                await Game.findOneAndUpdate({ slug }, { rating: averageRating });
    
                return res.status(200).json({
                    message: 'Cập nhật đánh giá thành công!',
                    review,
                    averageRating,
                });
            } else {
                // Nếu chưa có đánh giá, tạo mới
                review = new Rating({
                    email,
                    slug,
                    rating
                });
                await review.save();
    
                // Tính toán và cập nhật giá trị trung bình
                const reviews = await Rating.find({ slug });
                const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
                const averageRating = totalRating / reviews.length;
    
                await Game.findOneAndUpdate({ slug }, { rating: averageRating });
    
                return res.status(201).json({
                    message: 'Thêm đánh giá thành công!',
                    review,
                    averageRating,
                });
            }
        } catch (error) {
            console.error("Error handling rating:", error);
            return res.status(500).json({ message: 'Lỗi khi xử lý đánh giá!' });
        }
    }    
    
    
    
    
    async Comment(req, res) {
        try {
            const { slug, email, commentText } = req.body;

            if (!email) return res.status(401).json({ message: 'Cần đăng nhập để thực hiện bình luận!' });
            if (!commentText || commentText.trim() === "") return res.status(400).json({ message: 'Nội dung bình luận không được để trống!' });

            const game = await Game.findOne({ slug });
    
            // Tạo bình luận mới
            const newComment = new Comment({
                slug: slug,
                email,  
                commentText
            });
    
            // Lưu bình luận vào cơ sở dữ liệu
            await newComment.save();
    
            res.status(200).json({ message: 'Bình luận đã được thêm thành công', comment: newComment });
        } catch (error) {
            console.error("Error adding comment:", error);
            res.status(500).json({ message: 'Lỗi khi thêm bình luận' });
        }
    }


    async getAllComment(req, res) {
        try {
            const { slug } = req.query; // Lấy slug từ query parameters

            const game = await Game.findOne({ slug });
            const comments = await Comment.find({ slug: game.slug }).exec();
            const emails = comments.map(comment => comment.email);
            const users = await Users.find({ email: { $in: emails } }, 'email firstName lastName avatar').exec();

            // Tạo một đối tượng để tra cứu thông tin người dùng theo email
            const userMap = {};
            users.forEach(user => {
                userMap[user.email] = user; // Lưu thông tin người dùng theo email
            });

            // Kết hợp thông tin người dùng vào bình luận
            const commentsWithUserInfo = comments.map(comment => ({
                commentText: comment.commentText,
                createdAt: comment.createdAt,
                user: {
                    firstName: userMap[comment.email]?.firstName || '',
                    lastName: userMap[comment.email]?.lastName || '',
                    avatar: userMap[comment.email]?.avatar || ''
                }
            }));

            res.status(200).json({
                message: 'Lấy danh sách bình luận thành công',
                comments: commentsWithUserInfo
            });
        } catch (error) {
            console.error("Error fetching comments:", error);
            res.status(500).json({ message: 'Lỗi khi lấy danh sách bình luận' });
        }
    }


    async getInforForgot(req, res) {
        const { email } = req.query; 
        if (!email) {
            return res.status(400).json({ message: "Vui lòng cung cấp email!" });
        }
    
        // Tìm người dùng với email và chỉ lấy email và avatar
        const data = await Users.findOne({ email }, { email: 1, avatar: 1 });
    
        if (!data) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }
    
        return res.status(200).json(data);
    }
    

    async requestPasswordReset(req, res) {
        const { email } = req.body;

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email không tồn tại trong hệ thống." });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        const token = crypto.randomBytes(32).toString("hex"); 
        const expiration = Date.now() + 60 * 60 * 1000; 
        // console.log(expiration);
    
        // Lưu OTP, token và thời gian hết hạn vào cơ sở dữ liệu
        user.resetToken = token;
        user.resetOTP = otp;
        user.resetTokenExpiration = expiration;
        await user.save();
    
        // Gửi email với OTP và token
        await sendEmail(email, token, otp);
    
        res.status(200).json({ message: "OTP đã được gửi tới email của bạn.", token });
    }

    async verifyOTP(req, res) {
        const { email, otp } = req.body;
        
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "Email không tồn tại." });
        }
        // console.log(otp);
        // console.log(user.resetOTP);
        // console.log(user.resetTokenExpiration);
        // console.log(Date.now());
        if (user.resetOTP !== otp || user.resetTokenExpiration < Date.now()) {
            return res.status(400).json({ message: "Mã OTP không hợp lệ hoặc đã hết hạn." });
        }
    
        res.status(200).json({ message: "OTP hợp lệ. Bạn có thể đặt lại mật khẩu."});
    }

    async resetPassword(req, res) {
        const { email, newPassword } = req.body;

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email không hợp lệ." });
        }
        // if (user.resetTokenExpiration < Date.now()) {
        //     return res.status(400).json({ message: "Token đã hết hạn." });
        // }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined; // Xóa token sau khi sử dụng
        user.resetOTP = undefined; // Xóa OTP sau khi sử dụng
        user.resetTokenExpiration = undefined;
        await user.save();
    
        res.status(200).json({ message: "Mật khẩu đã được đặt lại thành công." });
    }
    

    
}

module.exports = new UserController();
