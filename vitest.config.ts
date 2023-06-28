/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		env: {
			APP_ENV: "QA",
			LOG_LEVEL: "fatal",
			NODE_ENV: "development",
		},
		// setupFiles: "dotenv/config",
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
		},
	},
});
