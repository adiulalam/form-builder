import { type GetServerSidePropsContext } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { getSession } from "next-auth/react";
import { Box, Grow } from "@mui/material";
import { useFormSort, LogProvider } from "@/store";
import InfiniteScroll from "react-infinite-scroll-component";
import { TransitionGroup } from "react-transition-group";
import { FormsCardsSkeletons } from "@/components/skeleton";
import { ErrorWrapper } from "@/components/ui";
import { LogCard, LogSearch, LogSort } from "@/components/logs";

export default function Logs() {
  const { order, sort } = useFormSort();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = api.log.getLogs.useInfiniteQuery(
    {
      order,
      sort,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  if (isError) {
    return <ErrorWrapper message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>FILDER - Logs</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col flex-nowrap items-center justify-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] p-2">
        <Box
          className="flex w-full flex-row items-center gap-2"
          maxWidth={"xl"}
        >
          <LogSort />
          <LogSearch />
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
                  (total, page) => total + page.data.logs.length,
                  0,
                ) ?? 0
              }
            >
              <TransitionGroup className="flex h-full w-full flex-row flex-wrap items-center justify-evenly gap-4">
                {data?.pages.map(
                  (logsData) =>
                    logsData?.data.logs.map((log) => (
                      <Grow key={log.id}>
                        <Box className="flex w-full sm:max-w-sm">
                          <LogProvider store={log}>
                            <LogCard />
                          </LogProvider>
                        </Box>
                      </Grow>
                    )),
                )}
              </TransitionGroup>
            </InfiniteScroll>
          )}
        </Box>
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