import { DashboardCards, DashboardChart, DashboardGrid } from ".";

export const DashboardQuestion = () => {
  return (
    <>
      <DashboardCards route="getDashboardQuestionCard" />

      <DashboardGrid maxCols={2}>
        <DashboardChart
          type="dashboardPieChart"
          route="getDashboardQuestionsType"
          title="Question Types Breakdown in All Forms"
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "top", horizontal: "middle" },
            },
          }}
          margin={{ top: 50, left: 100 }}
        />
        <DashboardChart
          type="dashboardBarChart"
          route="getDashboardTypesInteractionQuestions"
          title="User Interaction with Different Question Types"
        />
      </DashboardGrid>
    </>
  );
};
