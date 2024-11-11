// src/MainApp.tsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./Pages/home_screen";
import RouteDetailsScreen from "./Pages/route_details";
import AuthForm from "./Pages/auth_form";
import Profile from "./Pages/profile";
import MyBookings from "./Pages/MyBookings";
import Roots from "./Pages/Routes";




function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/routes" element={<Roots />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/route-details/:routeId" element={<RouteDetailsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
