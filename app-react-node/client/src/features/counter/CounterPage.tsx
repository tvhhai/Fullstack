import { Button, Typography, Stack, Paper } from "@mui/material";
import { useEffect } from "react";
import { loadCounter, increaseAsync } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

export default function CounterPage() {
  const count = useAppSelector((s) => s.counter.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCounter());
  }, [dispatch]);

  return (
    <Stack spacing={2} alignItems="flex-start">
      <Typography variant="h5">Counter (API)</Typography>
      <Paper
        variant="outlined"
        sx={{ p: 3, display: "flex", alignItems: "center", gap: 3 }}
      >
        <Typography variant="h3" fontWeight={700}>
          {count}
        </Typography>
        <Button variant="contained" onClick={() => dispatch(increaseAsync())}>
          Increment
        </Button>
      </Paper>
    </Stack>
  );
}
