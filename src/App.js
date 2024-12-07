import { BrowserRouter, Routes, Route } from "react-router";
import LoginScreen from "./screens/login/loginScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
