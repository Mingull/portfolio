#!/usr/bin/env node

import { defineCli } from "@mingull/cli-core/commander";
import accio from "./commands/accio";
import lumos from "./commands/lumos";
import reparo from "./commands/reparo";

await defineCli({
	name: "wand",
	description: "A magical developer CLI",
	version: { value: "0.0.0", flag: "-v, --version", description: "Show Wand version" },
	help: { flag: "-h, --help", description: "Show help information about Wand" },
	aliases: ["wave-wand", "ww"],
	commands: [accio, lumos, reparo],
}).run();
