import { type Session } from "next-auth";
import { type GetServerSidePropsContext } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { getSession } from "next-auth/react";
import { FormAdd, FormCard, FormSort } from "@/components/form";
import { Box } from "@mui/material";
import { useFormSort } from "@/hooks/useFormSort";

export default function Forms({ userSession }: { userSession: Session }) {
  const { order, sort } = useFormSort();
  const { data: formsData } = api.form.getPosts.useQuery({
    id: userSession.user.id,
    order,
    sort,
  });
  console.log("🚀 ~ file: form.tsx:14 ~ Form ~ data:", formsData);

  return (
    <>
      <Head>
        <title>FILDER - Forms</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-1">
        <FormSort />

        <Box className="flex h-full w-full flex-row flex-wrap items-center justify-evenly gap-4 space-y-2">
          {formsData?.data.forms.map((formData, index) => (
            <FormCard key={index} {...formData} />
          ))}
        </Box>
        <FormAdd />
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const userSession = await getSession(context);

    if (!userSession?.user?.id)
      return { redirect: { destination: "/", permanent: false } };

    return { props: { userSession } };
  } catch (error) {
    console.error(error);
    return { redirect: { destination: "/", permanent: false } };
  }
}
