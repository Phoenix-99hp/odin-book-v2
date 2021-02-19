const HWP = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	entry: path.join(__dirname, "/src/index.js"),
	output: {
		path: path.join(__dirname, "/build"),
		publicPath: "/",
		filename: "bundle.js",
	},
	devServer: {
		contentBase: path.join(__dirname, "/build"),
		hot: true,
		host: "localhost",
		port: 8002,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "fonts/",
						},
					},
				],
			},
			{
				test: /\.(svg|png|jpg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "images/",
						},
					},
				],
			},
			{
				test: /\.module\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true,
						},
					},
				],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /\.module\.(sa|sc|c)ss$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
					},
				],
			},
		],
	},
	plugins: [new HWP({ template: path.join(__dirname, "/public/index.html") })],
};
