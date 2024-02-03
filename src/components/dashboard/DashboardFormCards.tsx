import { DashboardCardContainer } from ".";

export const DashboardFormCards = () => {
  const cards = [
    {
      heading: "test saa efdewwwwfwefwefwefwe wef wefwef we fwe f",
      button: "Learn more",
    },
    {
      heading: "test 2",
      button: "Learn less",
    },
    {
      heading: "test 4",
      button: "Learn less",
    },
    {
      heading: "test 4",
      button: "Learn less",
    },
  ];

  return <DashboardCardContainer cards={cards} />;
};
