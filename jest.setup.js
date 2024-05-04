import "@testing-library/jest-dom";
jest.mock("next/router", () => require("next-router-mock"));

jest.mock("@mui/x-charts", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  BarChart: jest.fn().mockImplementation(({ children }) => children),
}));
