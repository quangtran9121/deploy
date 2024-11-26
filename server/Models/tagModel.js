// const {DataTypes} = require('sequelize');
// const sequelize = require('../DB/connect');
// module.exports = (sequelize, Sequelize) => {
//     const Tutorial = sequelize.define("tutorial", {
//       title: {
//         type: Sequelize.STRING
//       },
//       description: {
//         type: Sequelize.STRING
//       },
//       published: {
//         type: Sequelize.BOOLEAN
//       }
//     });
  
//     return Tutorial;
//   };



const mongoose = require('mongoose');
const Games = require('./gamesModel'); // Nhập model Games để sử dụng trong reference

// Định nghĩa Schema cho Tag
const tagSchema = new mongoose.Schema({
    tag_id: {
        type: Number,
        unique: true,
        required: true,
        autoIncrement: true // MongoDB không có auto-increment mặc định
    },
    game_id: {
        type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến _id của Game
        ref: 'Game', // Tham chiếu đến model 'Game'
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {
    timestamps: true, // Thêm createdAt và updatedAt tự động
});

// Tạo model từ Schema
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;






// const Tag = sequelize.model('tag',{
//     tag_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     game_id: {
//         type: DataTypes.INTEGER,
//         allowNUll: false,
//         references: {
//             Model: Games,
//             Key: game_id
//         }
//     },
//     type: {
//         type: DataTypes.STRING,
//         allowNUll: false
//     }
// })

// module.exports = Tag;