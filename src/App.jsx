import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@MEContexts/themeProvider.jsx";
import AuthChecker from "@MECommonComponents/hoc/authChecker";
import PublicRoute from "@MECommonComponents/hoc/publicRoute";
import SignInPage from "@MEPages/signInPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <AuthChecker>
          <Routes>
            <Route
              path={"/"}
              element={
                <PublicRoute>
                  <SignInPage />
                </PublicRoute>
              }
            />
          </Routes>
        </AuthChecker>
      </Router>
    </ThemeProvider>
  );
}

export default App;
