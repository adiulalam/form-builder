import { type GetServerSidePropsContext } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { z } from "zod";
import { FormProvider, QuestionProvider } from "@/store";
import { FormNavbar } from "@/components/form";
import { Box, Paper, Grow } from "@mui/material";
import { QuestionAdd, QuestionCard } from "@/components/question";
import { TransitionGroup } from "react-transition-group";

export default function Forms() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const {
    data: formData,
    isError,
    isLoading,
    isFetching,
  } = api.form.getPrivateForm.useQuery(
    { id },
    { enabled: z.string().uuid().safeParse(id).success },
  );

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isError || !formData) {
    return <div>error</div>;
  }

  return (
    <>
      <Head>
        <title>FILDER - Form</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] p-1">
        <FormProvider store={formData.data.form}>
          <Paper className="w-full max-w-screen-xl p-2">
            <FormNavbar isFetching={isFetching} />
          </Paper>

          <TransitionGroup className="m-auto flex h-full w-full flex-col flex-wrap items-center justify-evenly gap-4">
            {formData.data.form.questions.map((question, index) => (
              <Grow key={question.id}>
                <Box maxWidth={"xl"} className="flex w-full">
                  <QuestionProvider store={{ ...question, index }}>
                    <QuestionCard />
                  </QuestionProvider>
                </Box>
              </Grow>
            ))}
          </TransitionGroup>

          <QuestionAdd />
        </FormProvider>
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
