import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@MEContexts/themeProvider.jsx";
import {
  SIGN_IN,
  DASHBOARD,
  ADMISSION,
  ACADEMIC_CLASS,
  FEES,
  ADMISSION_DOCUMENTS,
  FACILITIES,
  PROFILE,
  SETTINGS,
} from "@MEPageRoutes";

import FeePage from "@MEPages/feePage";
import SignInPage from "@MEPages/signInPage";
import SettingPage from "@MEPages/settingPage";
import ProfilePage from "@MEPages/profilePage";
import FacilityPage from "@MEPages/facilityPage";
import DashboardPage from "@MEPages/dashboardPage";
import AdmissionPage from "@MEPages/admissionPage";
import AcademicClassPage from "@MEPages/academicClassPage";
import AdmissionDocumentPage from "@MEPages/admissionDocumentPage";
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
            <Route
              path={ADMISSION}
              element={
                <ProtectedRoute>
                  <AdmissionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ACADEMIC_CLASS}
              element={
                <ProtectedRoute>
                  <AcademicClassPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={FEES}
              element={
                <ProtectedRoute>
                  <FeePage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ADMISSION_DOCUMENTS}
              element={
                <ProtectedRoute>
                  <AdmissionDocumentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={FACILITIES}
              element={
                <ProtectedRoute>
                  <FacilityPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={PROFILE}
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path={SETTINGS}
              element={
                <ProtectedRoute>
                  <SettingPage />
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
