import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["./src/index.ts"],
	outDir: "dist",
	clean: true,
	platform: "node",
	target: "node24",
	sourcemap: false,
	dts: false,
	shims: false,
	unbundle: false,
	deps: { neverBundle: ["@mingull/cli-core"] },
});
