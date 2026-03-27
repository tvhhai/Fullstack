import { Component, type ErrorInfo, type ReactNode } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Refresh, BugReport } from "@mui/icons-material";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to monitoring service in production
    if (import.meta.env.PROD) {
      console.error("Error Boundary caught an error:", error, errorInfo);
      // TODO: Send to error monitoring service (Sentry, etc.)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container maxWidth="md">
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: "center",
                maxWidth: 600,
                width: "100%",
              }}
            >
              <BugReport
                sx={{
                  fontSize: 64,
                  color: "error.main",
                  mb: 2,
                }}
              />
              <Alert severity="error" sx={{ mb: 3 }}>
                <AlertTitle>Something went wrong</AlertTitle>
                An unexpected error occurred. Please try refreshing the page.
              </Alert>

              {import.meta.env.DEV && this.state.error && (
                <Box
                  sx={{
                    textAlign: "left",
                    bgcolor: "grey.100",
                    p: 2,
                    borderRadius: 1,
                    mb: 3,
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                    overflow: "auto",
                    maxHeight: 200,
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Error Details:
                  </Typography>
                  <pre>{this.state.error.toString()}</pre>
                  {this.state.errorInfo && (
                    <pre>{this.state.errorInfo.componentStack}</pre>
                  )}
                </Box>
              )}

              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={this.handleReset}
                sx={{ mr: 2 }}
              >
                Try Again
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </Paper>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}
