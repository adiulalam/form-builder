import { DashboardCards, DashboardChart, DashboardGrid } from ".";

export const DashboardQuestion = () => {
  return (
    <>
      <DashboardCards route="getDashboardQuestionCard" />

      <DashboardGrid maxCols={2}>
        <DashboardChart
          type="dashboardPieChart"
          route="getDashboardQuestionsType"
          title="Form Question Types Overview"
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
          title="User Interaction With Different Types of Question"
        />
      </DashboardGrid>
    </>
  );
};
