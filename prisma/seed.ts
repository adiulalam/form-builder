import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const userId = await prisma.user.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!userId) return new Error("No user id found");

  const formId = "1fc7e619-78c1-4e81-aa4b-07e8916a33fa";

  const testForm = await prisma.form.upsert({
    where: { id: formId },
    update: {},
    create: {
      id: formId,
      userId: userId.id,
      title: "test title",
      status: "DRAFT",
    },
  });
  console.log({ userId, testForm });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
