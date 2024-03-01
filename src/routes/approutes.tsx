import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/home";
import { Login } from "../pages/login";



type Props = {};

const AppRoutes = ({}: Props) => {
  return (
    <Routes>
      {/* <Route path="/" element={<Welcome />} /> */}
      {/* <Route path="/signup" element={<SignUp />} /> */}
       <Route path="/login" element={<Login />} /> 
      <Route path="/home" element={<Home />} />
      {/* <Route path="/song" element={<Song />} /> */}
      {/* <Route path="/playlist" element={<Playlist />} /> */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AppRoutes;
