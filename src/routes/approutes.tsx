import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from '../pages/signup';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { UserContextProvider } from '../context/useUserContext';
import { Welcome } from '../pages/welcome';
import { ProtectedRoutes } from '../components/protectedRoutes';
import { Profile } from '../pages/profile';

const AppRoutes = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/welcome"
          element={<ProtectedRoutes component={Welcome} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoutes component={Profile} />}
        />
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </UserContextProvider>
  );
};

export default AppRoutes;
