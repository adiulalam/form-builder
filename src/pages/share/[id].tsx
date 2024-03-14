import { type GetServerSidePropsContext } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { z } from "zod";
import { SubmissionProvider, FormProvider } from "@/store";
import { QuestionContainer } from "@/components/question";
import { QuestionsCardsSkeletons } from "@/components/skeleton";
import { ErrorWrapper } from "@/components/ui";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

export default function Forms() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const {
    data: formData,
    isError,
    isLoading,
    isFetching,
    error,
  } = api.form.getPublicForm.useQuery(
    { id },
    {
      enabled: z.string().uuid().safeParse(id).success,
    }
  );

  if (isError) {
    return <ErrorWrapper message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>
          {formData?.data
            ? `Filder - ${formData.data.submissionForm.form.title}`
            : "Filder -  Form"}
        </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-b from-[#2e026d] to-[#15162c] p-1">
        {isLoading ? (
          <QuestionsCardsSkeletons number={3} />
        ) : (
          <SubmissionProvider store={formData.data.submissionForm}>
            <FormProvider store={formData.data.submissionForm.form}>
              <QuestionContainer isFetching={isFetching} />
            </FormProvider>
          </SubmissionProvider>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const userSession = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (!userSession?.user?.id)
      return { redirect: { destination: "/", permanent: false } };

    return { props: { userSession } };
  } catch (error) {
    console.error(error);
    return { redirect: { destination: "/", permanent: false } };
  }
}
