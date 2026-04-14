import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["./src/**/index.ts"],
	outDir: "dist",
	clean: true,
	platform: "node",
	target: "node24",
	sourcemap: false,
	dts: true,
	shims: false,
	unbundle: true,
	deps: { neverBundle: ["commander"] },
});
