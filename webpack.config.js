const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const NodeExternals = require("webpack-node-externals");
const SizePlugin = require("size-plugin");
const WebpackBar = require("webpackbar");

module.exports = {
	entry: [path.resolve(__dirname, "src/index.js")],
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "main.js",
		libraryTarget: "commonjs"
	},
	target: "node",
	externals: [NodeExternals()],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						babelrc: true
					}
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "source-map-loader"
				}
			}
		]
	},
	devtool: "source-map",
	resolve: {
		symlinks: false
	},
	plugins: [
		new NodemonPlugin({
			verbose: false
		}),
		new DuplicatePackageCheckerPlugin(),
		new SizePlugin(),
		new WebpackBar()
	]
};
