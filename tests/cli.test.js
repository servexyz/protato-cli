const log = console.log;
import path from "path";
import test from "ava";
import execa from "execa";
import fs from "fs-extra";
import condenseWhitspace from "condense-whitespace";
import { helpMenuText } from "../cli";
import { printLine, printMirror } from "tacker";
import { init } from "protato-lib";

test("help menu prints correctly", async t => {
	const { stdout } = await execa("./cli.js", ["--help"]);
	const { description } = await fs.readJson("./package.json");
	let generatedHelpText = `${description} ${helpMenuText}`;
	t.is(condenseWhitspace(stdout), condenseWhitspace(generatedHelpText));
});

// test("protato-lib init", async t => {
// 	const out = init(path.resolve(__dirname));
// 	printMirror({ out }, "yellow", "grey");
// 	t.pass();
// });
