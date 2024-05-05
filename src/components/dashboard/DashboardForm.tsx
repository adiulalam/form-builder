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
        <DashboardChart
          type="dashboardPieChart"
          route="getDashboardFormsType"
          title="User Forms Overview: Draft vs. Completed"
        />
      </DashboardGrid>

      <DashboardGrid maxCols={2}>
        <DashboardChart
          type="dashboardScatterChart"
          route="getDashboardScatterChart"
        />
        <DashboardChart
          type="dashboardLineChart"
          route="getDashboardMonthlySubmittedForms"
          title={`Monthly Form Submission Trends For ${new Date().getFullYear()}`}
        />
      </DashboardGrid>
    </>
  );
};
