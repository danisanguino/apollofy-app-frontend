import { Logo } from '../../components/layout/logo';
import { Button } from '../../components/global/button';
import './home.css';
import { useAuth0 } from "@auth0/auth0-react"

type Props = {};

export function Home({}: Props) {
  const { loginWithRedirect } = useAuth0()

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
          <Button style="btn-yellow" handleClick={()=>loginWithRedirect()}>
            LET'S START
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
