const log = console.log;
import test from "ava";
import execa from "execa";
import fs from "fs-extra";
import condenseWhitspace from "condense-whitespace";
import { helpMenuText } from "./cli";
import { printLine, printMirror } from "tacker";

test("main", async t => {
	const { stdout } = await execa("./cli.js", ["--help"]);
	const { description } = await fs.readJson("./package.json");
	const stripped = {
		pStdout: (() => {
			return condenseWhitspace(stdout);
		})(),
		pHelp: (() => {
			let str = `${description} ${helpMenuText}`;
			return condenseWhitspace(str);
		})()
	};
	const { pStdout, pHelp } = stripped;
	// printMirror({ pStdout }, "magenta", "grey");
	// printMirror({ pHelp }, "magenta", "grey");
	t.is(pStdout, pHelp);
});
