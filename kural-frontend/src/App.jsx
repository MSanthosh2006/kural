import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import NeedHelp from "./pages/Needhelp";
import ProvideHelp from "./pages/Providehelp";
import Dashboard from "./pages/Dashboard";
import HelpDetails from "./pages/HelpDetails";
import Onboarding from "./pages/Onboarding";
import MapView from "./pages/MapView";



function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 SMART ROOT ROUTE */}
        <Route
          path="/"
          element={user ? <Home /> : <Onboarding />}
        />

        <Route path="/need-help" element={<NeedHelp />} />
        <Route path="/provide-help" element={<ProvideHelp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/need-help/:type" element={<HelpDetails />} />
        <Route path="/map" element={<MapView />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;