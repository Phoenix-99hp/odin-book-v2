require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 8000;

const mongoDb = process.env.DB_URI || process.env.DEV_DB;
mongoose.connect(mongoDb, {
	useFindAndModify: false,
	useUnifiedTopology: true,
	useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

require("./routes")(app);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
