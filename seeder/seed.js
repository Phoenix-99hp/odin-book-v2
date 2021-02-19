require("dotenv").config();
const mongoose = require("mongoose");
const db = require("../models");
const bcrypt = require("bcryptjs");

mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

const comments = [];
const blogUser = [];

function userCreate(username, password, avatar, profilePicture) {
	const user = new db.User({
		username: username,
		password: password,
		avatar: avatar,
		profilePicture: profilePicture,
	});
	blogUser.push(user);
	user.save((err, result) => {
		if (err) {
			console.log(err, "Error saving user");
			return;
		}
	});
}

function postCreate(title, text, user, comments) {
	const post = new db.Post({
		title: title,
		text: text,
		user: user,
		comments: comments,
	});
	post.save(function (err, result) {
		if (err) {
			console.log("Error saving post", err);
			return;
		}
	});
}

function commentCreate(user, text) {
	const comment = new db.Comment({ text: text, user: user });
	comments.push(comment);
	comment.save(function (err, result) {
		if (err) {
			console.log("Error saving comment", err);
			return;
		}
	});
}

function createUser() {
	userCreate(
		"Drake McGarrah",
		bcrypt.hashSync(process.env.USER_PW, 10),
		"../images/phoenixlogo.jpg",
		"../images/phoenixlogo.jpg"
	);
}

function createPosts() {
	console.log(comments);
	postCreate("Hello", "All", blogUser[0], [comments[0]]);
	postCreate("Test", "1", blogUser[0], [comments[1]]);
	postCreate("Test", "2", blogUser[0], [comments[2]]);
	postCreate("Test", "3", blogUser[0], [comments[3]]);
	postCreate("Test", "4", blogUser[0], [comments[4]]);
	postCreate("Test", "5", blogUser[0], [comments[5]]);
	postCreate("Test", "6", blogUser[0], [comments[6]]);
	postCreate("Test", "7", blogUser[0], [comments[7]]);
	postCreate("Test", "8", blogUser[0], [comments[8]]);
	postCreate("Test", "9", blogUser[0], [comments[9]]);
}

function createComments() {
	commentCreate(blogUser[0], "Test comment");
	commentCreate(blogUser[0], "Test comment");
	commentCreate(blogUser[0], "Test comment");
	commentCreate(blogUser[0], "Test comment");
	commentCreate(blogUser[0], "Test comment");
	commentCreate(blogUser[0], "Everything Matters");
	commentCreate(blogUser[0], "Test comment");
	commentCreate(blogUser[0], "Test comment");
	commentCreate(blogUser[0], "Test comment");
	commentCreate(blogUser[0], "Test comment");
}

function createData(cb) {
	db.User.deleteMany({})
		.then(() => db.Post.deleteMany({}))
		.then(() => db.Comment.deleteMany({}))
		.then(() =>
			createUser("Drake McGarrah", bcrypt.hashSync(process.env.USER_PW, 10))
		)
		.then(() => createComments())
		.then(() => createPosts())
		.catch((err) => {
			console.error(err);
			process.exit(1);
		});
	cb;
}

createData(
	setTimeout(() => {
		console.log("data created");
		process.exit(0);
	}, 1000)
);
