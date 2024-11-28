import * as fs from "fs-extra";
import * as path from "path";
import { defaultConfigTemplateJS, defaultConfigTemplateTS } from "./defaults";

export default function buildConfigFile() {
  let possibleConfigs = [
    {
      name: "cui.config.js",
      path: path.resolve(process.cwd(), "cui.config.js"),
      content: defaultConfigTemplateJS,
    },
    {
      name: "cui.config.ts",
      path: path.resolve(process.cwd(), "cui.config.ts"),
      content: defaultConfigTemplateTS,
    },
  ];

  let finalConfig = possibleConfigs[0];

  // Check if config already exists
  if (possibleConfigs.some((pc) => fs.existsSync(pc.path))) {
    console.error("You have already initialised this project.");
    console.error(
      "Delete the config file (eg: cui.config.ts) before initialising again."
    );
    process.exit(1);
  }

  // Check if env is typescript
  const tsconfig = path.resolve(process.cwd(), "tsconfig.json");
  if (fs.existsSync(tsconfig)) {
    finalConfig = possibleConfigs[1];
  }

  try {
    fs.writeFileSync(finalConfig.path, finalConfig.content.trim());
    console.log(`✔ Created ${finalConfig.name} in the project root.`);
  } catch (error) {
    console.error(`✖ Failed to create ${finalConfig.name}:`, error);
    process.exit(1);
  }
}
