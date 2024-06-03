import { PrismaClient } from "@prisma/client";
import { seedforms } from "./seedforms";

const prisma = new PrismaClient();

const main = async () => {
  const user = await prisma.user.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!user) return new Error("No user id found");

  await seedforms(user.id);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
