import { DashboardCards, DashboardGrid } from ".";
import { BarChart } from "@mui/x-charts/BarChart";

export const DashboardForm = () => {
  return (
    <>
      <DashboardCards route="getDashboardFormCard" />

      <DashboardGrid maxCols={3}>
        <BarChart
          series={[
            { data: [35, 44, 24, 34] },
            { data: [51, 6, 49, 30] },
            { data: [15, 25, 30, 50] },
            { data: [60, 50, 15, 25] },
          ]}
          xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
        />
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
        />

        <BarChart
          series={[
            { data: [3, 4, 1, 6, 5], stack: "A", label: "Series A1" },
            { data: [4, 3, 1, 5, 8], stack: "A", label: "Series A2" },
            { data: [4, 2, 5, 4, 1], stack: "B", label: "Series B1" },
            { data: [2, 8, 1, 3, 1], stack: "B", label: "Series B2" },
            { data: [10, 6, 5, 8, 9], label: "Series C1" },
          ]}
        />
      </DashboardGrid>
    </>
  );
};
