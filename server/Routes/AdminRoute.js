const express = require('express');
const router = express.Router();
const ControllerAdmin = require('../Controllers/ControllerAdmin/ControllerAdmin');
const upload = require('../Middleware/upload')



// Endpoint để thêm game với upload ảnh
router.post('/api/addgame', upload.single('img'), ControllerAdmin.AddGame);
router.delete('/api/deletegame/:game_id',ControllerAdmin.DeleteGame);
router.patch('/api/updategame', upload.single('img'), ControllerAdmin.UpdateGame);
router.get('/api/getlistusers', ControllerAdmin.GetListUser);
router.get('/api/getgame', ControllerAdmin.GetListGame);
router.post('/api/userauthorization', ControllerAdmin.EditUser);
router.post('/api/authorization', ControllerAdmin.EditUserActive);

module.exports = router;
