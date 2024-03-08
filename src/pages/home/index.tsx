import { Logo } from '../../components/layout/logo';
import { Button } from '../../components/global/button';
import './home.css';
import { useNavigate } from 'react-router-dom';

type Props = {};

export function Home({}: Props) {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home">
      <div className="home-contents">
        <Logo />
        <h1>
          If you like music,
          <br />
          we have it.
        </h1>
        <div className="home-buttons">
          <Button style="btn-yellow" handleClick={goToLogin}>
            LOG IN
          </Button>
          <Button style="btn-white" handleClick={goToSignUp}>
            SIGN UP
          </Button>
        </div>
      </div>
      <p>
        By clicking on Sign up, you agree to
        <br />
        Apollogy’s Terms and Conditions of use.
      </p>
      <p></p>
    </div>
  );
}
