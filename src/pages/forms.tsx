import { type GetServerSidePropsContext } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { getSession } from "next-auth/react";
import { FormAdd, FormCard, FormSearch, FormSort } from "@/components/form";
import { Box, Grow } from "@mui/material";
import { useFormSort, FormProvider } from "@/store";
import InfiniteScroll from "react-infinite-scroll-component";
import { TransitionGroup } from "react-transition-group";
import { FormsCardsSkeletons } from "@/components/skeleton";

export default function Forms() {
  const { order, sort } = useFormSort();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    api.form.getForms.useInfiniteQuery(
      {
        order,
        sort,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  return (
    <>
      <Head>
        <title>FILDER - Forms</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col flex-nowrap items-center justify-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] p-2">
        <Box
          className="flex w-full flex-row items-center gap-2"
          maxWidth={"xl"}
        >
          <FormSort />
          <FormSearch />
        </Box>

        <Box className="m-auto h-full w-full">
          {isLoading ? (
            <FormsCardsSkeletons number={4} />
          ) : (
            <InfiniteScroll
              next={fetchNextPage}
              hasMore={hasNextPage ?? false}
              loader={
                isFetchingNextPage && (
                  <FormsCardsSkeletons number={2} additionalClass="mt-4" />
                )
              }
              dataLength={
                data?.pages.reduce(
                  (total, page) => total + page.data.forms.length,
                  0,
                ) ?? 0
              }
            >
              <TransitionGroup className="flex h-full w-full flex-row flex-wrap items-center justify-evenly gap-4">
                {data?.pages.map(
                  (formsData) =>
                    formsData?.data.forms.map((formData) => (
                      <Grow key={formData.id}>
                        <Box className="flex w-full sm:max-w-sm">
                          <FormProvider store={formData}>
                            <FormCard />
                          </FormProvider>
                        </Box>
                      </Grow>
                    )),
                )}
              </TransitionGroup>
            </InfiniteScroll>
          )}
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
