import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SIGN_IN, DASHBOARD } from "@MEPageRoutes";
import { ThemeProvider } from "@MEContexts/themeProvider.jsx";

import SignInPage from "@MEPages/signInPage";
import DashboardPage from "@MEPages/dashboardPage";
import AuthChecker from "@MECommonComponents/hoc/authChecker";
import PublicRoute from "@MECommonComponents/hoc/publicRoute";
import ProtectedRoute from "@MECommonComponents/hoc/protectedRoute";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <AuthChecker>
          <Routes>
            <Route
              path={SIGN_IN}
              element={
                <PublicRoute
                  redirectAuthenticated={true}
                  redirectTo={DASHBOARD}
                >
                  <SignInPage />
                </PublicRoute>
              }
            />
            <Route
              path={DASHBOARD}
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthChecker>
      </Router>
    </ThemeProvider>
  );
}

export default App;
