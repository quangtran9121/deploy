const mongoose = require('mongoose');
require('dotenv').config(); 
const url = process.env.MONGO_URL;  

const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};

module.exports = connectDB;







// const Mongoose = require('mongoose');
// //require('dotenv').config();
// const url = 'mongodb+srv://quangtran91:wZ3mz36JT8MduFiC@intern.0aiuu.mongodb.net/'
   
// const connectDB = async () => {
//     try {
//         await Mongoose.connect(url);
//         console.log('MongoDB connected');
//     } catch (error) {
//         console.error('Failed to connect to MongoDB', error);
//     }
// };

// module.exports = connectDB;
// connectDB();



// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_SERVER,
//     dialect: 'mssql', // Nếu bạn đang sử dụng SQL Server
//     logging: false,
//     dialectOptions: {
//         encrypt: process.env.DB_ENCRYPT === 'true',
//         trustServerCertificate: process.env.DB_TRUST_CERT === 'true'
//     }
// });

// const connectDB = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Kết nối thành công đến CSDL SQL Server');
//     } catch (err) {
//         console.error('Lỗi kết nối', err);
//     }
// };

// module.exports = {
//     sequelize,
//     connectDB
// };





// const sql = require('mssql');
// require('dotenv').config();
// const { Sequelize, DataTypes } = require('sequelize');


// module.exports = sequelize;

// const config = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     server: process.env.DB_SERVER,
//     database: process.env.DB_DATABASE,
//     options: {
//         encrypt: process.env.DB_ENCRYPT === 'true',
//         trustServerCertificate: process.env.DB_TRUST_CERT === 'true'
//     }
// };
   
// const connectDB  = async() => {   
//     try {
//         await sql.connect(config);
//         console.log('Kết nối thành công đến CSDL SQL Server')
//     } catch (err){
//         console.error('Lỗi kết nối', err);
//     };
// }

// // Xuất kết nối
// module.exports = {
//     sql,
//     connectDB
// };