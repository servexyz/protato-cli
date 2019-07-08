const log = console.log;
import test from "ava";
import execa from "execa";
import chalk from "chalk";
import prettier from "prettier";
import { helpMenuText } from "./cli";

test("main", async t => {
	const { stdout } = await execa("./cli.js", ["--help"]);
	const pretty = {
		pStdout: (() => {
			prettier.format(stdout);
		})(),
		pHelp: (() => {
			prettier.format(helpMenuText);
		})()
	};
	const { pStdout, pHelp } = pretty;
	log(`${chalk.blue(stdout)}`);
	t.is(pStdout, pHelp);
});
