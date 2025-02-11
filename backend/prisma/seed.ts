import { PrismaClient } from "@prisma/client";
import { runAllSeeders } from "./seeds/index";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");
  await runAllSeeders();
  console.log("✅ Seeding complete!");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});
