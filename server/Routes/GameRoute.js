const express = require('express');
const router = express.Router();
const ControllerGame = require("../Controllers/GameController/GameController");

router.post('/api/game', ControllerGame.GetListGame)
router.get('/api/gamedetail/:slug', ControllerGame.GetGame)
router.get('/api/gamedetailid', ControllerGame.GetGameId)
router.post('/api/searchgame', ControllerGame.SearchGame)
router.get('/api/filters', ControllerGame.getFilterValues)
router.post('/api/similargame', ControllerGame.SimilarGame)
router.post('/api/counter', ControllerGame.playGame)
router.get('/api/categories', ControllerGame.getAllCategories)


module.exports = router;