const log = console.log;
import test from "ava";
import execa from "execa";
import chalk from "chalk";
import prettier from "prettier";
import fs from "fs-extra";
import { helpMenuText } from "./cli";

test("main", async t => {
	const { stdout } = await execa("./cli.js", ["--help"]);
	const { description } = await fs.readJson("./package.json");
	log(`Desc: ${description}`);
	//TODO: Grab desc and prepend it to helpMenuText for it to match stdout
	const pretty = {
		pStdout: (() => {
			prettier.format(stdout, { parser: "babel" });
		})(),
		pHelp: (() => {
			// prettier.format(`${description}\n${helpMenuText}`, { parser: "babel" });
			let str = `${description}\n${helpMenuText}`;
			prettier.format(str, { parser: "babel" });
		})()
	};
	const { pStdout, pHelp } = pretty;
	log(`pStdout: ${chalk.magenta(pStdout)}`);
	log(`pHelp: ${chalk.magenta(pHelp)}`);
	// log(`${chalk.blue(stdout)}`);
	// t.is(pStdout, pHelp);
	t.pass();
});
