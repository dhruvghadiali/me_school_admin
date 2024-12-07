import { BrowserRouter, Routes, Route,  } from "react-router";

import LoginScreen from "./screens/login/loginScreen";
import HomeScreen from "./screens/home/homeScreen";
import AdmissionScreen from "./screens/admission/admissionScreen";
import ProfileScreen from "./screens/profile/profileScreen";
import SettingsScreen from "./screens/settings/settingsScreen";
import { routeName } from "./utils/routeName";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routeName.root} element={<LoginScreen />} />
        <Route path={routeName.home} element={<HomeScreen />} />
        <Route path={routeName.admission} element={<AdmissionScreen />} />
        <Route path={routeName.schoolProfile} element={<ProfileScreen />} />
        <Route path={routeName.settings} element={<SettingsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
