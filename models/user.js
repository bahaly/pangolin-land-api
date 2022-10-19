const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false", {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect("mongodb+srv://root:12password@mflix.pvgzl.mongodb.net/?retryWrites=true&w=majority")
const friendSchema = mongoose.Schema({
    friendId: { type: String, unique: true},
});

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role:{type: String, required: true },
  address:{type: String},
  specie:{type:String},
  imageUrl: { type: String, required: true }, 
  friends:[friendSchema]
});

//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);