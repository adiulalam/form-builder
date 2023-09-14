import { type GetServerSidePropsContext } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { getSession } from "next-auth/react";
import { FormAdd, FormCard, FormSearch, FormSort } from "@/components/form";
import { Box, Typography } from "@mui/material";
import { useFormSort } from "@/hooks/useFormSort";
import { FormsProvider } from "@/store/FormsProvider";
import { FormProvider } from "@/store/FormProvider";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Forms() {
  const { order, sort } = useFormSort();
  const { data, refetch, fetchNextPage, hasNextPage } =
    api.form.getForms.useInfiniteQuery(
      {
        order,
        sort,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );
  console.log("🚀 ~ file: form.tsx:14 ~ Form ~ data:", data);

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

          <Box className="m-auto h-full w-full">
            <InfiniteScroll
              next={fetchNextPage}
              hasMore={hasNextPage ?? false}
              loader={<Typography>Loading...</Typography>}
              dataLength={
                data?.pages.reduce(
                  (total, page) => total + page.data.forms.length,
                  0,
                ) ?? 0
              }
            >
              <Box className="flex h-full w-full flex-row flex-wrap items-center justify-evenly gap-4">
                {data?.pages.map(
                  (formsData) =>
                    formsData?.data.forms.map((formData) => (
                      <FormProvider key={formData.id} store={formData}>
                        <FormCard />
                      </FormProvider>
                    )),
                )}
              </Box>
            </InfiniteScroll>
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
