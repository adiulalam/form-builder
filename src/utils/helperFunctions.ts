import dayjs from "dayjs";

export const roundIfNessesary = (input: number | string, maxRound = 1) => {
  const inputToString = input.toString();
  return parseFloat(inputToString).toFixed(maxRound);
};

export const generateMonthDetailsArray = () => {
  const currentYear = dayjs().year();
  const monthsArray = Array.from({ length: 12 }, (_, index) => {
    const startDate = dayjs(new Date(currentYear, index, 1)).startOf("month");
    const endDate = startDate.endOf("month");

    return {
      id: index + 1,
      index,
      month: startDate.format("MMMM"),
      short_month: startDate.format("MMM"),
      start_date: startDate.date(),
      end_date: endDate.date(),
      year: startDate.format("YYYY"),
      iso_start_date: startDate.format("YYYY-MM-DD"),
      iso_end_date: endDate.format("YYYY-MM-DD"),
    };
  });

  return monthsArray;
};
