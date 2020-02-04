var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NFC_UserSchema = new Schema({
   username:String,
   pictureURL:String,
});

module.exports = mongoose.model("NFC_User", NFC_UserSchema);