import { LandingInfo, LandingPlayground } from "@/components/landing";
import { Box } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>FILDER - Home</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className="flex min-h-screen flex-col items-center gap-4 p-2 bg-gradient-to-b from-green-300 to-red-100 dark:from-green-800 dark:to-red-400">
        <LandingInfo />
        <LandingPlayground />
      </Box>
    </>
  );
}
