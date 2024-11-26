const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/ControllerUser')
const upload = require('../Middleware/upload')

router.post('/api/register', UserController.Register)
router.post('/api/login', UserController.Login)
router.delete('/api/logout', UserController.Logout)
router.get('/api/getuserdetail', UserController.GetDataAuth)
router.post('/api/userprofile', UserController.GetUserProfile)
router.get('/api/mygame', UserController.GetMyGame)
router.post('/api/changepassword', UserController.ChangePassword)
router.post('/api/editprofile', UserController.EditProfile);
router.post('/api/avatar', upload.single('avatar'), UserController.ChangeAvt);
router.get('/api/getgamesplayed', UserController.getGamesPlayed);
router.post('/api/gamesplayed', UserController.GamesPlayed);
router.post('/api/rating', UserController.Rating);
router.get('/api/getrating', UserController.GetRating);
router.post('/api/comment', UserController.Comment);
router.get('/api/getallcomment', UserController.getAllComment);
router.get('/api/getinforfogot', UserController.getInforForgot);
router.post('/api/resetpassword', UserController.requestPasswordReset);
router.post('/api/verifyotp', UserController.verifyOTP);
router.post('/api/resetnewpassword', UserController.resetPassword);






module.exports = router;

