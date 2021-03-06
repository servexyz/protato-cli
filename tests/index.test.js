const log = console.log;
import test from "ava";
import execa from "execa";
import fs from "fs-extra";
import condenseWhitspace from "condense-whitespace";
import { helpMenuText } from "../src/index";
import { printLine, printMirror } from "tacker";
import { init } from "protato-lib";

test("src/index.js - help menu prints correctly", async t => {
	const { stdout } = await execa("./src/index.js", ["--help"]);
	const { description } = await fs.readJson("./package.json");
	let generatedHelpText = `${description} ${helpMenuText}`;
	t.is(condenseWhitspace(stdout), condenseWhitspace(generatedHelpText));
});

test("build/main.js - help menu prints correctly", async t => {
	const { stdout } = await execa("./build/main.js", ["--help"]);
	const { description } = await fs.readJson("./package.json");
	let generatedHelpText = `${description} ${helpMenuText}`;
	t.is(condenseWhitspace(stdout), condenseWhitspace(generatedHelpText));
});

test("protato-lib init inline config", async t => {
	const inlineConfig = {
		parent: {
			dir: "sandbox/node-starter"
		},
		children: [
			{
				dir: "sandbox/npm-starter-sample-module",
				src: "src"
			},
			{
				dir: "sandbox/library-genesis",
				src: "src"
			}
		]
	};

	init(__dirname, inlineConfig);
	t.pass();
});

// test("protato-lib init .protato.js config", async t => {
// 	await execa("./src/index.js", ["watch"]);
// 	t.pass();
// });
