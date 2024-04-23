import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/home";
import { Welcome } from "../pages/welcome";
import { ProtectedRoutes } from "../components/protectedRoutes";
import { Profile } from "../pages/profile";
import { Favourites } from "../pages/favourites";
import { Player } from "../pages/player";
import { PlayerBar } from "../components/layout/playerBar";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PlayerBar />}>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/favourites"
          element={<ProtectedRoutes component={Favourites} />}
        />
        <Route
          path="/player"
          element={<ProtectedRoutes component={Player} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/welcome" />} />
    </Routes>
  );
};

export default AppRoutes;
