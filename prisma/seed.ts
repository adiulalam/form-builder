import { PrismaClient } from "@prisma/client";
import { seedForms } from "./seedForms";
import { seedSubmissions } from "./seedSubmissions";

const prisma = new PrismaClient();

const main = async () => {
  const user = await prisma.user.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!user) return new Error("No user id found");

  const options = await seedForms(user.id);
  const optionIds = options.map(({ id }) => id);

  await seedSubmissions(user.id, optionIds);
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
