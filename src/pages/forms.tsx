import { type GetServerSidePropsContext } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { getSession } from "next-auth/react";
import { FormAdd, FormCard, FormSearch, FormSort } from "@/components/form";
import { Box } from "@mui/material";
import { useFormSort } from "@/hooks/useFormSort";
import { FormsProvider } from "@/store/FormsProvider";
import { FormProvider } from "@/store/FormProvider";

export default function Forms() {
  const { order, sort } = useFormSort();
  const { data: formsData, refetch } = api.form.getForms.useQuery({
    order,
    sort,
  });
  console.log("🚀 ~ file: form.tsx:14 ~ Form ~ data:", formsData);

  const store = {
    refetch,
  };

  return (
    <>
      <Head>
        <title>FILDER - Forms</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col flex-nowrap items-center justify-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] p-2">
        <FormsProvider store={store}>
          <Box
            className="flex w-full flex-row items-center gap-2"
            maxWidth={"xl"}
          >
            <FormSort />
            <FormSearch />
          </Box>

          <Box className="m-auto flex h-full w-full flex-row flex-wrap items-center justify-evenly gap-4">
            {formsData?.data.forms.map((formData, index) => (
              <FormProvider key={index} store={formData}>
                <FormCard />
              </FormProvider>
            ))}
          </Box>
          <FormAdd />
        </FormsProvider>
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
