const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
	friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
	avatar: {
		data: Buffer,
		contentType: String,
	},
	profilePicture: {
		data: Buffer,
		contentType: String,
	},
});

module.exports = mongoose.model("User", UserSchema);
