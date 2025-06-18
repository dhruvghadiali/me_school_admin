import { routeName } from "@MEUtils/routeName";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router";

import FeeScreen from "@MEScreens/fee/feeScreen";
import SignInScreen from "@MEScreens/signIn/signInScreen";
import ProfileScreen from "@MEScreens/profile/profileScreen";
import SettingsScreen from "@MEScreens/settings/settingsScreen";
import DashboardScreen from "@MEScreens/dashboard/dashboardScreen";
import AdmissionScreen from "@MEScreens/admission/admissionScreen";
import AcademicClassScreen from "@MEScreens/academicClass/academicClassScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routeName.root} element={<DashboardScreen />} />
        <Route path={routeName.signIn} element={<SignInScreen />} />
        <Route path={routeName.settings} element={<SettingsScreen />} />
        <Route path={routeName.dashboard} element={<DashboardScreen />} />
        <Route path={routeName.admission} element={<AdmissionScreen />} />
        <Route path={routeName.schoolProfile} element={<ProfileScreen />} />
        <Route path={routeName.academicClass} element={<AcademicClassScreen />} />
        <Route path={routeName.fees} element={<FeeScreen />} />
        <Route path="*" element={<Navigate to={routeName.dashboard} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
