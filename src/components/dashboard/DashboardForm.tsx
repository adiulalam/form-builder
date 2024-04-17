import { DashboardCards, DashboardGrid } from ".";
import {
  DashboardBarChart,
  DashboardLineChart,
  DashboardPieChart,
  DashboardScatterChart,
} from "./charts";

export const DashboardForm = () => {
  return (
    <>
      <DashboardCards route="getDashboardFormCard" />

      <DashboardGrid maxCols={2}>
        <DashboardBarChart route="getDashboardBarChart" />
        <DashboardPieChart route="getDashboardPieChart" />
      </DashboardGrid>

      <DashboardGrid maxCols={2}>
        <DashboardLineChart route="getDashboardLineChart" />
        <DashboardScatterChart route="getDashboardScatterChart" />
      </DashboardGrid>
    </>
  );
};
