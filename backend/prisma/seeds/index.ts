import { seedUsers } from "./user.seed";


export async function runAllSeeders() {
  await seedUsers();
}
