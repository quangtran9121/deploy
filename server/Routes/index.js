const UserRoute = require('./userRoute');
const GameRoute = require('./GameRoute')
const AdminRoute = require('./AdminRoute')
const AuthMidleware = require('../Middleware/authMiddleware/jwtMiddleware');

function route(app){
    //User route
    app.post('/api/register', UserRoute);
    app.post('/api/login', UserRoute);
    app.delete('/api/logout', UserRoute);
    app.get('/api/getuserdetail', UserRoute);
    app.post('/api/userprofile', UserRoute);
    app.get('/api/mygame', UserRoute);
    app.post('/api/changepassword', UserRoute);
    app.post('/api/editprofile', UserRoute);
    app.post('/api/avatar', UserRoute);
    app.get('/api/getgamesplayed', UserRoute);
    app.post('/api/gamesplayed', UserRoute);
    app.post('/api/rating', UserRoute);
    app.get('/api/getrating', UserRoute);
    app.post('/api/comment', UserRoute);
    app.get('/api/getallcomment', UserRoute);
    app.get('/api/getinforfogot', UserRoute);
    app.post('/api/resetpassword', UserRoute);
    app.post('/api/verifyotp', UserRoute);
    app.post('/api/resetnewpassword', UserRoute);

    //Admin route
    app.post('/api/addgame', AdminRoute);
    app.delete('/api/deletegame/:game_id', AuthMidleware.verifyToken, AuthMidleware.verifyAdmin, AdminRoute);
    // app.delete('/api/deletegame/:game_id', AdminRoute);
    app.patch('/api/updategame', AdminRoute);
    app.get('/api/getlistusers', AuthMidleware.verifyToken, AuthMidleware.verifyAdmin, AdminRoute);
    app.get('/api/getgame', AdminRoute);
    app.post('/api/userauthorization', AuthMidleware.verifyToken, AuthMidleware.verifyAdmin, AdminRoute);
    app.post('/api/authorization', AuthMidleware.verifyToken, AuthMidleware.verifyAdmin, AdminRoute);

    //Game route
    app.post('/api/game', GameRoute);
    app.get('/api/gamedetail/:slug', GameRoute);
    app.post('/api/searchgame', GameRoute);
    app.get('/api/filters', GameRoute);
    app.post('/api/similargame', GameRoute);
    app.get('/api/gamedetailid', GameRoute);
    app.post('/api/counter', GameRoute);
    app.get('/api/categories', GameRoute)
}
module.exports = route;








//module.exports = route;