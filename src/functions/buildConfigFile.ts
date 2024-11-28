import * as fs from "fs-extra";
import * as path from "path";

// Default configuration template
const defaultConfigTemplate = `
import { defineConfig } from '@studiocubics/core';

export default defineConfig({
  // Your StudioCubics configuration
  project: {
    name: 'My StudioCubics Project',
  },
  // Add more configuration options as needed
});
`;

export default function buildConfigFile() {
  const configPath = path.resolve(process.cwd(), "sc.config.ts");

  // Check if config already exists
  if (fs.existsSync(configPath)) {
    console.error("sc.config.ts already exists in this directory.");
    process.exit(1);
  }

  // Write the default configuration file
  try {
    fs.writeFileSync(configPath, defaultConfigTemplate.trim());
    console.log("✔ Created sc.config.ts in the project root.");
  } catch (error) {
    console.error("✖ Failed to create sc.config.ts:", error);
    process.exit(1);
  }
}
