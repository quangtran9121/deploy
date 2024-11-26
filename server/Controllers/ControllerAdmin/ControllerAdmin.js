const Game = require('../../Models/gamesModel');
const slugify = require('slugify');
const User = require('../../Models/usersModel');
const {jwtDecode} = require('jwt-decode');

async function generateUniqueSlug(game_name) {
    let slug = slugify(game_name, { lower: true, strict: true });
    let uniqueSlug = slug;
    let counter = 1;

    // Kiểm tra nếu slug đã tồn tại trong cơ sở dữ liệu
    while (await Game.exists({ slug: uniqueSlug })) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }

    return uniqueSlug;
}
class ControllerAdmin{
    async GetListGame(req, res){
        try {
            const data = await Game.find({});
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({mesage: 'Lỗi tìm kiếm dữ liệu.'})
        }
    }
//Thêm game
    async AddGame(req, res) {
        const { game_name, developer, token, img, title, description, url, languages, player, mobile_compatible, expectedTraffic, tag, genres } = req.body;

        try {
            if (!token) {
                return res.status(401).json({ message: 'No token provided. Unauthorized access.' });
            }
            
            console.log(languages);
            
            const decode = jwtDecode(token);
            const email = decode.email;

            const gamedata = await Game.findOne({}).sort({ game_id: -1 });
            let newid = 1;
            if (gamedata) {
                newid = gamedata.game_id + 1;
            }

            // Tạo slug duy nhất cho game
            const slug = await generateUniqueSlug(game_name);

            const newgame = new Game({
                game_id: newid,
                game_name: game_name,
                slug: slug, // Thêm slug vào document
                email: email,
                img: req.file.filename,
                developer: developer,
                title: title,
                description: description,
                url: url,
                languages: languages,
                players: player,
                mobile_compatible: mobile_compatible,
                expectedTraffic: expectedTraffic,
                tag: tag,
                genres: genres,
            });

            await newgame.save();
            res.status(201).json({ message: 'Thêm game mới thành công.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi thêm game.' });
        }
    }
//Xóa game
    async DeleteGame(req, res) {
        Game.deleteOne({ game_id: req.params.game_id })
            .then((datagame) => res.status(200).json({ message: 'Xóa game thành công!', datagame }))
            .catch((err) => res.status(500).json({ message: 'Lỗi khi xóa game', error: err }));
    }
//Cập nhật game
    async UpdateGame(req, res) {
        const { game_id, game_name, img, developer, title, description, url, languages, player, mobile_compatible, expectedTraffic, tag, genres } = req.body;
        
        try {
            // Tìm game theo `game_id`
            const data = await Game.findOne({ game_id: game_id });
            
            if (!data) {
                // Nếu không tìm thấy game, trả về 404
                return res.status(404).json({ message: "Game không tồn tại." });
            }

            // Tạo lại slug nếu `game_name` không rỗng và khác với tên hiện tại
            let updatedSlug = data.slug;
            if (game_name && game_name !== data.game_name) {
                updatedSlug = await generateUniqueSlug(game_name);
            }

            // Cập nhật các trường, bao gồm `slug` nếu cần
            await data.updateOne({
                game_name: game_name || data.game_name,
                slug: updatedSlug, // Cập nhật slug mới nếu cần
                img: req.file ? req.file.filename : data.img,
                developer: developer || data.developer,
                title: title || data.title,
                description: description || data.description,
                url: url || data.url,
                languages: languages || data.languages,
                players: player || data.players,
                mobile_compatible: mobile_compatible || data.mobile_compatible,
                expectedTraffic: expectedTraffic || data.expectedTraffic,
                tag: tag || data.tag,
                genres: genres || data.genres,
            });

            return res.status(200).json({ message: 'Sửa Thành Công !!!' });
        } catch (error) {
            console.error("Error updating game:", error);
            return res.status(500).json({ message: "Lỗi server!", error });
        }
    }
//Quản lý người dùng
    async GetListUser(req,res){
        try {
            const users = await User.find({});
            return res.status(200).json(users)

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Lỗi server!'});

        } 
    }



    async EditUser(req, res) {
        const { valueSelect, email } = req.body;

        try {
            const data = await User.findOne({ email: email });
            if (data) {
                let updateFields = {};
                if (valueSelect === '4') {
                    updateFields = { isAdmin: false, isPublisher: false, isDeveloper: false };
                } else if (valueSelect === '3') {
                    updateFields = { isAdmin: false, isPublisher: true, isDeveloper: false };
                } else if (valueSelect === '2') {
                    updateFields = { isAdmin: false, isPublisher: false, isDeveloper: true };
                } else {
                    updateFields = { isAdmin: true, isPublisher: false, isDeveloper: false };
                }

                await data.updateOne(updateFields);
                res.status(200).json({ message: 'Chỉnh Sửa Thành Công !!!' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async EditUserActive(req, res) {
        const { valueSelect, email } = req.body;

        try {
            const data = await User.findOne({ email: email });
            if (data) {
                if (valueSelect === '2') {
                    data.isactive = false
                } else {
                    data.isactive = true;
                }

                await data.updateOne(data);
                res.status(200).json({ message: 'Cập nhật thành công!!!' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

};
module.exports = new ControllerAdmin;