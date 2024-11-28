import * as fs from "fs-extra";
import * as path from "path";

const defaultConfigs = `{
  // Your Cubics UI configuration
  styleEngine: "css",
  type: "typescript",
  // Add more configuration options as needed
}`;

// Default configuration templates
const defaultConfigTemplateTS = `
import { defineConfig } from '@cubicsui/cli';

export default defineConfig(${defaultConfigs});
`;
const defaultConfigTemplateJS = `
import { defineConfig } from '@cubicsui/cli';

export default defineConfig(${defaultConfigs});
`;

export default function buildConfigFile() {
  const configPath = path.resolve(process.cwd(), "cui.config.ts");

  // Check if config already exists
  if (fs.existsSync(configPath)) {
    console.error("cui.config.ts already exists in this directory.");
    process.exit(1);
  }

  // Write the default configuration file
  try {
    fs.writeFileSync(configPath, defaultConfigTemplateTS.trim());
    console.log("✔ Created cui.config.ts in the project root.");
  } catch (error) {
    console.error("✖ Failed to create sc.config.ts:", error);
    process.exit(1);
  }
}
