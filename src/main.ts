import { program } from "commander";
import buildConfigFile from "./config/buildConfigFile";

program
  .command("init")
  .description("Initialize a new @studicubics/cli configuration")
  .action(buildConfigFile);

program.parse(process.argv);
