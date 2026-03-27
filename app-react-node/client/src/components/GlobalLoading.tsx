import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";
import { useAppSelector } from "../hooks";

export default function GlobalLoading() {
  const loading = useAppSelector((s) => s.loading.activeRequests > 0);

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: 9999,
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
      open={loading}
    >
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress color="inherit" size={48} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Global Loading...
        </Typography>
      </Box>
    </Backdrop>
  );
}
