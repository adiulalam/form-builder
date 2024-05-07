import { currentMonthName } from "@/utils/helperFunctions";
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
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "top", horizontal: "middle" },
            },
          }}
          margin={{ top: 50, left: 100 }}
        />
      </DashboardGrid>

      <DashboardGrid maxCols={2}>
        <DashboardChart
          type="dashboardScatterChart"
          route="getDashboardMonthlyInteractionForms"
          title={`User Interactions with Forms for ${currentMonthName}`}
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
