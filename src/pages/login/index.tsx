import React, { useEffect, useState } from 'react';
import { Logo } from '../../components/layout/logo';
import { Button } from '../../components/global/button';
import { Inputs } from '../../components/global/inputs';
import './login.css';
import { getUsers } from '../../utils/functions';
import { User } from '../../utils/interfaces/user';
import { useUserContext } from '../../context/useUserContext';
import { useNavigate } from 'react-router-dom';

type Props = {};

export function Login({}: Props) {
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [users, setUsers] = useState([] as User[]);
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);
  const user = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserApi() {
      const data = await getUsers();
      setUsers(data);
    }
    getUserApi();
  }, []);

  const loginForm = (element: React.FormEvent<HTMLFormElement>) => {
    element.preventDefault();
    const foundUser = users.find((user) => user.email === userEmail);
    if (foundUser) {
      if (foundUser.password === userPass) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        user.setUser(foundUser);
        navigate('/welcome');
      } else {
        setUserError(false);
        setPassError(true);
      }
    } else {
      setUserError(true);
      setPassError(false);
    }
  };

  function handleClickSignUp() {
    navigate('/signup');
  }

  return (
    <div className="login">
      <Logo />
      <form className="login-buttons" onSubmit={loginForm}>
        <Inputs
          type="email"
          name="email"
          placeholder="email"
          handleChange={(ev) => {
            setUserEmail(ev.target.value);
          }}
        />
        {userError && (
          <small className="message-error email">user not found</small>
        )}
        <Inputs
          type="password"
          name="pass"
          placeholder="password"
          handleChange={(ev) => {
            setUserPass(ev.target.value);
          }}
        />
        {passError && (
          <small className="message-error password">incorrect password</small>
        )}
        <Button style="btn-yellow">LOG IN</Button>
      </form>
      <section>
        <p>Don't have an account?</p>
        <Button handleClick={handleClickSignUp} style="btn-white">
          SIGN UP
        </Button>
      </section>
    </div>
  );
}
