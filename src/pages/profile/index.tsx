import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/global/button';

export function Profile() {
  const navigate = useNavigate();
  function handleClick() {
    localStorage.removeItem('user');
    navigate('/');
  }
  return (
    <>
      <h2>Aquí se cierra sesión</h2>
      <Button style="btn-yellow" handleClick={handleClick}>
        LOG OUT
      </Button>
    </>
  );
}
