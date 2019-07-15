#!/usr/bin/env node
"use strict";
const log = console.log;
const meow = require("meow");
const { init } = require("protato-lib");
const { printMirror } = require("tacker");
const path = require("path");
const isEmpty = require("is-empty");
const chalk = require("chalk");
const fs = require("fs-extra");

const helpMenuText = `$ protato --help

	Usage
	$ protato [command][--flag]

	Commands
	$ protato yalc
	> List your current packages; install yalc if directory not found

	$ protato config
	> Generate an empty config if you don't have one in your CWD

	$ protato watch
	> Begin watching your child modules for updates


	Options
	--yalc (-y)
	> "link" --> Symlinks child module into parent module
	> "add" --> dependency in your parent package.json


	Examples
	$ protato yalc
	> --> "package1", "package2"

	$ protato config
	> --> ".protato.js has been created"

	$ protato watch -ya
	> --> "Now adding child modules to parent module"

	$ protato watch -yl
	> --> "Now linking child modules to parent module"
	`;

const cli = meow(helpMenuText, {
	flags: {
		yalc: {
			type: "string",
			default: "link"
		}
	}
});

log(
	`input: ${cli.input[0] || "link"}\n flags: ${JSON.stringify(
		cli.flags,
		null,
		2
	)}`
);

async function watch() {
	let dir = path.resolve(process.cwd(), ".protato.json");
	printMirror({ dir }, "magenta", "grey");
	let config = await fs.readJson(dir);
	printMirror({ config }, "blue", "grey");
	// init(process.cwd(), config);
	init();
}

//TODO: Add checksum for empty command str

if (!isEmpty(cli.input[0])) {
	switch (cli.input[0].toLowerCase()) {
		case "watch":
			watch();
			break;
		default:
			log(`${chalk.red(cli.input[0])} is not recognized as a command`);
	}
}

module.exports = { helpMenuText };
