import { createTheme, type PaletteMode } from "@mui/material/styles";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#1976d2" },
      ...(mode === "dark" && {
        background: { default: "#121212", paper: "#1e1e1e" },
      }),
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
      },
    },
  });

export const STORAGE_KEY = "color-mode";
