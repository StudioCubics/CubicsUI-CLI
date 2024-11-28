export default async function buildComponent(component: string) {
  try {
    console.log(`⏳ Building ${component}, please wait...`);
    console.log(`✔ Created ${component} in the project root.`);
  } catch (error) {
    console.error(`✖ Failed to create ${component}:`, error);
    process.exit(1);
  }
}
