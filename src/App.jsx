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
import MESidebar from "@MECommonComponents/sidebar/meSidebar";
import AuthChecker from "@MECommonComponents/hoc/authChecker";
import PublicRoute from "@MECommonComponents/hoc/publicRoute";
import AdmissionDocumentPage from "@MEPages/admissionDocumentPage";
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
                  <MESidebar>
                    <DashboardPage />
                  </MESidebar>
                </ProtectedRoute>
              }
            />
            <Route
              path={ADMISSION}
              element={
                <ProtectedRoute>
                  <MESidebar>
                    <AdmissionPage />
                  </MESidebar>
                </ProtectedRoute>
              }
            />
            <Route
              path={ACADEMIC_CLASS}
              element={
                <ProtectedRoute>
                  <MESidebar>
                    <AcademicClassPage />
                  </MESidebar>
                </ProtectedRoute>
              }
            />
            <Route
              path={FEES}
              element={
                <ProtectedRoute>
                  <MESidebar>
                    <FeePage />
                  </MESidebar>
                </ProtectedRoute>
              }
            />
            <Route
              path={ADMISSION_DOCUMENTS}
              element={
                <ProtectedRoute>
                  <MESidebar>
                    <AdmissionDocumentPage />
                  </MESidebar>
                </ProtectedRoute>
              }
            />
            <Route
              path={FACILITIES}
              element={
                <ProtectedRoute>
                  <MESidebar>
                    <FacilityPage />
                  </MESidebar>
                </ProtectedRoute>
              }
            />
            <Route
              path={PROFILE}
              element={
                <ProtectedRoute>
                  <MESidebar>
                    <ProfilePage />
                  </MESidebar>
                </ProtectedRoute>
              }
            />
            <Route
              path={SETTINGS}
              element={
                <ProtectedRoute>
                  <MESidebar>
                    <SettingPage />
                  </MESidebar>
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
