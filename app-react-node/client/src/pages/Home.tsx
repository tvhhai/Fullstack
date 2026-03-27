import { Typography, Paper, Stack } from "@mui/material";
import { useAppSelector } from "../hooks";

export default function HomePage() {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <Stack spacing={2}>
      <Typography variant="h4">
        Welcome{user ? `, ${user.name}` : ""}!
      </Typography>
      {user && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Username: {user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Role: {user.role}
          </Typography>
        </Paper>
      )}
    </Stack>
  );
}
