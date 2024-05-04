import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: () => ({ push: jest.fn(), pathname: jest.fn() }),
}));

jest.mock("@mui/x-charts", () => ({
  BarChart: jest
    .fn()
    .mockImplementation(
      ({ children }: { children: React.ReactNode }) => children
    ),
}));
