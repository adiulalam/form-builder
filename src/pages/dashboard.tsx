import Head from "next/head";
import { Box, Tabs, Tab } from "@mui/material";
import { type SyntheticEvent, useState } from "react";
import {
  DashboardAnswer,
  DashboardForm,
  DashboardQuestion,
} from "@/components/dashboard";

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const tabsList = [
    {
      label: "Form",
      Component: () => <DashboardForm />,
    },
    {
      label: "Question",
      Component: () => <DashboardQuestion />,
    },
    {
      label: "Answer",
      Component: () => <DashboardAnswer />,
    },
  ];

  return (
    <>
      <Head>
        <title>FILDER - Dashboard</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col flex-nowrap items-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] p-2">
        <Box className="flex w-full flex-col gap-2" maxWidth={"xl"}>
          <Box
            sx={{ borderColor: "divider" }}
            className="flex w-full items-center justify-center border-b-2"
          >
            <Tabs value={currentTab} onChange={handleChange}>
              {tabsList.map(({ label }, index) => (
                <Tab key={index} label={label} />
              ))}
            </Tabs>
          </Box>

          {tabsList.map(
            ({ Component }, index) =>
              index === currentTab && <Component key={index} />,
          )}
        </Box>
      </main>
    </>
  );
}
