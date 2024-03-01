import { ElementType } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  component: ElementType;
};

export function ProtectedRoutes(props: Props) {
  const user = localStorage.getItem('user');

  if (!user) {
    return <Navigate to="/" />;
  }

  return <props.component />;
}
