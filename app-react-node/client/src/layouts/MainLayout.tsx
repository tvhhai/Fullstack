import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { DarkMode, LightMode, Logout } from "@mui/icons-material";
import { useAppDispatch, useColorMode } from "../hooks";
import { logout } from "../store/authSlice";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Counter", path: "/counter" },
  { label: "Users", path: "/user" },
];

export default function MainLayout() {
  const { mode, toggleColorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar
        position="sticky"
        color="default"
        variant="outlined"
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 700, mr: 4 }}>
            MyApp
          </Typography>

          <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                variant={pathname === item.path ? "contained" : "text"}
                size="small"
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Logout">
            <IconButton onClick={handleLogout} color="inherit">
              <Logout />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3, flexGrow: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
