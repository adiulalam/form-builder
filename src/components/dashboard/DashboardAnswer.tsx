import { DashboardCards, DashboardChart, DashboardGrid } from ".";

export const DashboardAnswer = () => {
  return (
    <>
      <DashboardCards route="getDashboardAnswerCard" />

      <DashboardGrid maxCols={1}>
        <DashboardChart
          type="dashboardBarChart"
          route="getDashboardAnswersTypes"
          title="Number of Options Created per Question Types"
        />
      </DashboardGrid>
    </>
  );
};
