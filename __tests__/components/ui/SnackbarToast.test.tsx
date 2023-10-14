import type { AlertColor } from "@mui/material";
import { SnackbarToast } from "@/components/ui";
import { useSnackbarToast } from "@/store";
import { render, screen, act, renderHook } from "@testing-library/react";

const snackbarsData = [
  {
    data: {
      isOpen: true,
      severity: "success" as AlertColor,
      message: "This is a success message",
    },
    icon: "SuccessOutlinedIcon",
  },
  {
    data: {
      isOpen: true,
      severity: "error" as AlertColor,
      message: "This is a error message",
    },
    icon: "ErrorOutlineIcon",
  },
  {
    data: {
      isOpen: true,
      severity: "info" as AlertColor,
      message: "This is a info message",
    },
    icon: "InfoOutlinedIcon",
  },
  {
    data: {
      isOpen: true,
      severity: "warning" as AlertColor,
      message: "This is a warning message",
    },
    icon: "ReportProblemOutlinedIcon",
  },
];

describe("Test the 'SnackbarToast' component", () => {
  snackbarsData.forEach((snackbars) =>
    it(`Should return ${snackbars.data.severity} toast with message`, () => {
      render(<SnackbarToast />);

      const {
        result: { current: setSnackConfig },
      } = renderHook(() => useSnackbarToast((state) => state.setSnackConfig));
      act(() => {
        setSnackConfig(snackbars.data);
      });

      expect(screen.getByText(snackbars.data.message)).toBeInTheDocument();
      expect(screen.getByTestId(snackbars.icon)).toBeInTheDocument();
      expect(screen.getByTestId("CloseIcon")).toBeInTheDocument();
    }),
  );
});
