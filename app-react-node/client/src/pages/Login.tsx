import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  IconButton,
  Tooltip,
  Avatar,
  Container,
  Fade,
} from "@mui/material";
import { DarkMode, LightMode, LockOutlined } from "@mui/icons-material";
import { type FormEvent, useState } from "react";
import { useAppDispatch, useColorMode } from "../hooks";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useColorMode();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await dispatch(login({ username, password })).unwrap();
      navigate("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          mode === "dark"
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
        position: "relative",
      }}
    >
      {/* Dark mode toggle */}
      <Box sx={{ position: "absolute", top: 24, right: 24 }}>
        <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
          <IconButton
            onClick={toggleColorMode}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            {mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Tooltip>
      </Box>

      <Container maxWidth="sm">
        <Fade in timeout={200}>
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: 3,
              backdropFilter: "blur(10px)",
              bgcolor:
                mode === "dark"
                  ? "rgba(30, 30, 30, 0.95)"
                  : "rgba(255, 255, 255, 0.95)",
            }}
            component="form"
            onSubmit={handleSubmit}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                <LockOutlined />
              </Avatar>
            </Box>

            <Typography variant="h4" fontWeight={700} textAlign="center" mb={1}>
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              Sign in to continue to your account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              autoFocus
              size="medium"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              size="medium"
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ py: 1.5, fontSize: "1rem", fontWeight: 600 }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}
