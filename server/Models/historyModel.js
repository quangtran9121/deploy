const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    slug: [{
        type: String,
    }]
})

const History = mongoose.model('History', HistorySchema);

module.exports = History;