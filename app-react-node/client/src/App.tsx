import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { useAppDispatch } from "./hooks";
import { checkAuth } from "./store/authSlice";
import GlobalLoading from "./components/GlobalLoading";
import ErrorBoundary from "./components/ErrorBoundary";

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <GlobalLoading />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
