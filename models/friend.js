const mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false", {useNewUrlParser: true, useUnifiedTopology: true});

const friendSchema = mongoose.Schema({
  userId: { type: String, required: true },
  friendId: { type: String, required: true },
});

module.exports = mongoose.model('Friend', friendSchema);