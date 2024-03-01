import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "../pages/signup";
import { Home } from "../pages/home";

type Props = {};

const AppRoutes = ({}: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/welcome" element={<Welcome />} /> */}
      {/* <Route path="/song" element={<Song />} /> */}
      {/* <Route path="/playlist" element={<Playlist />} /> */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AppRoutes;
