const Game = require('../../Models/gamesModel');
const FuzzySearch = require('fuzzy-search');
class ControllerGame {
    
    async GetListGame(req, res) {
        try {
            const { game_name, genres, developer, language, players, mobile_compatible, sort } = req.body;
            
            // Check if all fields are empty
            if (!game_name && !genres && !developer && !language && !players && !mobile_compatible && !sort) {
                const allGames = await Game.find({});
                return res.status(200).json(allGames);
            }
    
            // Build search criteria dynamically
            let searchCriteria = {};
            if (genres) searchCriteria.genres = genres;
            if (developer) searchCriteria.developer = developer;
            if (language) searchCriteria.languages = language;
            if (players) searchCriteria.players = players;
            if (mobile_compatible) searchCriteria.mobile_compatible = mobile_compatible;
            
            // Apply search criteria to find games
            let games = await Game.find(searchCriteria);
    
            // Sort based on `update_at` if sort is specified
            if (sort === 'newest') {
                games = games.sort((a, b) => new Date(b.update_at) - new Date(a.update_at));
            } else if (sort === 'oldest') {
                games = games.sort((a, b) => new Date(a.update_at) - new Date(b.update_at));
            }
    
            // If game_name is provided, apply FuzzySearch
            if (game_name) {
                const searcher = new FuzzySearch(games, ['game_name']);
                const result = searcher.search(game_name);
                return res.status(200).json(result);
            }
    
            // Return filtered and sorted games based on criteria
            return res.status(200).json(games);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi tìm kiếm dữ liệu.' });
            console.log(error);
        }
    }
    
    
    
    
    async GetGame(req, res) {
        try {
            const slug = req.params.slug; // lấy slug từ URL
            const gamedetail = await Game.findOne({ slug: slug }); // tìm theo slug thay vì id
            if (!gamedetail) {
                return res.status(404).json({ message: 'Không tìm thấy trò chơi' });
            }
            res.status(200).json(gamedetail);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi dữ liệu' });
        }
    }

    async GetGameId(req, res) {
        try {
            const id = req.query.id;
            const gamedetail = await Game.findOne({game_id:id});
            res.status(200).json(gamedetail)
        } catch (error) {
            res.status(500).json({ message: 'Lỗi dữ liệu' });
        }
    }
    
    async SearchGame(req,res){
        console.log(req.body);
        try {
            const name = req.body.game_name;
            const games = await Game.find({});
            const searcher = new FuzzySearch(games, ['game_name']);

            const result = searcher.search(name);
            res.status(201).json(result)
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Không tìm thấy game!'});
        }
    }
//FILTER
    async getFilterValues(req, res) {
        try {
            // Fetch all games from the database
            const games = await Game.find({});
    
            // Extract unique values for each filter field
            const genres = [...new Set(games.map(game => game.genres))];
            const developers = [...new Set(games.map(game => game.developer))];
            const languages = [...new Set(games.flatMap(game => game.languages))]; // Use flatMap to flatten arrays
            const players = [...new Set(games.map(game => game.players))];
            const mobileCompatible = [...new Set(games.map(game => game.mobile_compatible))];
    
            // Send the unique values as a response
            res.status(200).json({
                genres,
                developers,
                languages,
                players,
                mobileCompatible
            });
        } catch (error) {
            console.error("Error fetching filter values:", error);
            res.status(500).json({ message: 'Failed to fetch filter values' });
        }
    }

    async SimilarGame(req, res) {
        try {
            const { slug, genres } = req.body;
    
            if (!genres || genres.length === 0) {
                return res.status(400).json({ message: 'Genres are required to find similar games' });
            }
    
            // Tìm các game có cùng thể loại và không bao gồm game hiện tại
            const similarGames = await Game.find({
                genres: { $in: genres },
                slug: { $ne: slug }, // Loại trừ game có slug trùng
            })
            .limit(6); // Giới hạn kết quả trả về tối đa 6 game
    
            // Trả về danh sách các game tương tự
            return res.status(200).json(similarGames);
        } catch (error) {
            console.error('Error fetching similar games:', error);
            return res.status(500).json({ message: 'Error fetching similar games' });
        }
    }

    async playGame(req, res) {
        const { slug } = req.body;

        try {
            // Kiểm tra xem game có tồn tại không
            const game = await Game.findOne({ slug });
            if (!game) {
                return res.status(404).json({ message: 'Game không tồn tại!' });
            }

            // Tăng số lần chơi của game
            game.play_count = game.play_count ? game.play_count + 1 : 1;
            await game.save();

            // Trả về phản hồi thành công
            res.status(200).json({
                message: `Số lần chơi của game "${game.game_name}" đã được tăng lên: ${game.play_count}.`,
                playCount: game.play_count,
            });
        } catch (error) {
            console.error('Error in playGame:', error);
            res.status(500).json({ message: 'Lỗi máy chủ. Vui lòng thử lại sau.' });
        }
    };
    
    async getAllCategories(req, res) {
        try {
            // Lấy dữ liệu cho từng danh mục
            const topPicks = await Game.find({}).sort({ play_count: -1 }).limit(10);
            const christmasGames = await Game.find({ genres: { $regex: 'Christmas', $options: 'i' } }).limit(10); 
            const bestNew = await Game.find({}).sort({ update_at: -1 }).limit(10); 
    
            // Trả về dữ liệu với tiêu đề cho từng danh mục
            res.status(200).json({
                categories: [
                    {
                        title: 'Top Picks',
                        games: topPicks,
                    },
                    {
                        title: 'Christmas',
                        games: christmasGames,
                    },
                    {
                        title: 'Best New',
                        games: bestNew,
                    },
                ],
            });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách game:', error);
            res.status(500).json({ message: 'Lỗi máy chủ khi lấy danh sách game.' });
        }
    };
    
    
    
}  

module.exports = new ControllerGame;