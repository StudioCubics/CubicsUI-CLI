import { program } from "commander";
import buildConfigFile from "./build/buildConfigFile";
import buildComponent from "./build/buildComponent";

program
  .command("init")
  .option("--ts", "Adds typescript as the value of mode in the config file.")
  .description("Initialize a new @studicubics/cli configuration")
  .action(buildConfigFile);

program
  .command("create")
  .description("Creates a component based on what argument is provided")
  .argument("<component>", "component to create")
  .action((component) => buildComponent(component));

program.parse(process.argv);
