const log = console.log;
import test from "ava";
import execa from "execa";
import chalk from "chalk";
import prettier from "prettier";
import fs from "fs-extra";
import { helpMenuText } from "./cli";
import { printLine, printMirror } from "tacker";

test("main", async t => {
	const { stdout } = await execa("./cli.js", ["--help"]);
	const { description } = await fs.readJson("./package.json");
	printLine("blue");
	printMirror({ description }, "blue", "grey");
	printLine("blue");
	//TODO: Grab desc and prepend it to helpMenuText for it to match stdout
	const pretty = {
		pStdout: (() => {
			return prettier.format(stdout, { parser: "babel" });
		})(),
		pHelp: (() => {
			// prettier.format(`${description}\n${helpMenuText}`, { parser: "babel" });
			let str = `${description}\n${helpMenuText}`;
			return prettier.format(str, { parser: "babel" });
		})()
	};
	const { pStdout, pHelp } = pretty;
	// log(`pStdout: ${chalk.magenta(pStdout)}`);
	// log(`pHelp: ${chalk.magenta(pHelp)}`);
	printMirror({ pStdout }, "magenta", "grey");
	printMirror({ pHelp }, "magenta", "grey");
	// log(`${chalk.blue(stdout)}`);
	// t.is(pStdout, pHelp);
	t.pass();
});
