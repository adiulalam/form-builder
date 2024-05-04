import { DashboardCards, DashboardChart, DashboardGrid } from ".";

export const DashboardForm = () => {
  return (
    <>
      <DashboardCards route="getDashboardFormCard" />

      <DashboardGrid maxCols={2}>
        <DashboardChart
          type="dashboardBarChart"
          route="getDashboardMonthlyForms"
          title={`Monthly Form Creation Trends For ${new Date().getFullYear()}`}
        />
        <DashboardChart type="dashboardPieChart" route="getDashboardPieChart" />
      </DashboardGrid>

      <DashboardGrid maxCols={2}>
        <DashboardChart
          type="dashboardLineChart"
          route="getDashboardLineChart"
        />
        <DashboardChart
          type="dashboardScatterChart"
          route="getDashboardScatterChart"
        />
      </DashboardGrid>
    </>
  );
};
