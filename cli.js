#!/usr/bin/env node
"use strict";
const log = console.log;
const meow = require("meow");
const { init } = require("protato-lib");

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

// (function handler() {
// 	log(
// 		`input: ${cli.input[0] || "link"}\n flags: ${JSON.stringify(
// 			cli.flags,
// 			null,
// 			2
// 		)}`
// 	);
// })();

module.exports = { helpMenuText };
