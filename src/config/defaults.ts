import { z } from "zod";

// Define the configuration schema using Zod
const ConfigSchema = z.object({
  library: z.enum(["react", "svelte"]),
  styleEngine: z.enum(["css", "scss", "tailwind"]),
  type: z.enum(["typescript", "javascript"]),
});

// Configuration type
export type ConfigProps = z.infer<typeof ConfigSchema>;

// Default values matching your specification
export const defaultValues: ConfigProps = {
  library: "react",
  styleEngine: "css",
  type: "typescript",
};

/**
 * Define and validate StudioCubics configuration
 * @param config Partial configuration object
 * @returns Validated configuration
 */
export function defineConfig(config: Partial<ConfigProps> = {}): ConfigProps {
  try {
    // Merge default values with provided config
    const mergedConfig = { ...defaultValues, ...config };

    // Validate the merged configuration
    return ConfigSchema.parse(mergedConfig);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Provide detailed validation errors
      console.error(
        "Configuration Validation Error:",
        error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("\n")
      );
      throw new Error("Invalid CubicsUI configuration");
    }
    throw error;
  }
}

// Example usage

export const defaultConfigsFormatted = `{
    styleEngine: ${defaultValues.styleEngine},
    type: ${defaultValues.type},
}`;

// Default configuration templates
export const defaultConfigTemplateTS = `
  import { defineConfig } from '@cubicsui/cli';

  export default defineConfig(${defaultConfigsFormatted});
  `;
export const defaultConfigTemplateJS = `
  import { defineConfig } from '@cubicsui/cli';
  
  export default defineConfig(${defaultConfigsFormatted});
  `;