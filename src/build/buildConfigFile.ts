import * as path from "path";
import * as prettier from "prettier";
import { defaultConfigTemplateJS, defaultConfigTemplateTS } from "../config/defaults";
import { writeFile } from "fs/promises";
import { existsSync } from "fs";

export default async function buildConfigFile() {
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
  if (possibleConfigs.some((pc) => existsSync(pc.path))) {
    console.log(
      "This project seems to be already initialised for @cubicsui/cli."
    );
    console.log("If you want to install a new component");
    console.log("Run:");
    console.log("   npx cui create <component>");
    console.error(
      "If you are trying to reinitialise this project then delete the config file(cui.config) before initialising again."
    );
    process.exit(1);
  }
  console.log("⏳ Building config file, please wait...");
  // TODO ask using inquirer

  // Check if env is typescript
  const tsconfig = path.resolve(process.cwd(), "tsconfig.json");
  if (existsSync(tsconfig)) {
    console.log("⏳ tsconfig.json file detected, switching to typescript mode");
    finalConfig = possibleConfigs[1];
  }

  try {
    console.log("⏳ Finalizing config file, please wait...");

    // Format the final config with prettier
    const finalConfigContent = await prettier.format(
      finalConfig.content.trim(),
      { semi: false, parser: "babel" }
    );
    await writeFile(finalConfig.path, finalConfigContent);

    console.log(`✔ Created ${finalConfig.name} in the project root.`);
  } catch (error) {
    console.error(`✖ Failed to create ${finalConfig.name}:`, error);
    process.exit(1);
  }
}
