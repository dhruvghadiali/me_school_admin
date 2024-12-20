import { routeName } from "@MEUtils/routeName";
import { BrowserRouter, Routes, Route,  } from "react-router";

import LoginScreen from "@MEScreens/login/loginScreen";
import DashboardScreen from "@MEScreens/dashboard/dashboardScreen";
import AdmissionScreen from "@MEScreens/admission/admissionScreen";
import ProfileScreen from "@MEScreens/profile/profileScreen";
import SettingsScreen from "@MEScreens/settings/settingsScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routeName.root} element={<LoginScreen />} />
        <Route path={routeName.dashboard} element={<DashboardScreen />} />
        <Route path={routeName.admission} element={<AdmissionScreen />} />
        <Route path={routeName.schoolProfile} element={<ProfileScreen />} />
        <Route path={routeName.settings} element={<SettingsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
