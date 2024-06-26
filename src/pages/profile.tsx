import Head from "next/head";
import { Box } from "@mui/material";
import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { ProfileInfo, ProfileEdit } from "@/components/profile";
import { api } from "@/utils/api";
import { ErrorWrapper } from "@/components/ui";
import { ProfileProvider } from "@/store/ProfileProvider";
import {
  ProfileEditSkeleton,
  ProfileInfoSkeleton,
} from "@/components/skeleton";

export default function Profile() {
  const { data, isLoading, isError, error } = api.profile.getProfile.useQuery();

  if (isError) {
    return <ErrorWrapper message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>FILDER - Profile</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className="flex min-h-screen p-2 justify-center">
        <Box className="grid grid-cols-3 gap-2 h-max w-full" maxWidth={"xl"}>
          {isLoading ? (
            <>
              <ProfileEditSkeleton />
              <ProfileInfoSkeleton />
            </>
          ) : (
            <ProfileProvider store={data?.data.result}>
              <ProfileEdit />
              <ProfileInfo />
            </ProfileProvider>
          )}
        </Box>
      </Box>
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
