#!/usr/bin/env node

import { defineCli } from "@mingull/cli-core/commander";
import accio from "./commands/accio";
import lumos from "./commands/lumos";
import reparo from "./commands/reparo";

defineCli({
	name: "wand",
	description: "A magical developer CLI",
	version: "0.0.0",
	aliases: ["wave-wand", "ww"],
	commands: [accio, lumos, reparo],
}).run();
