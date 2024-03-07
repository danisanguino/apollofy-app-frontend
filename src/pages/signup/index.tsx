import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { Button } from '../../components/global/button';
import { Inputs } from '../../components/global/inputs';
import { Logo } from '../../components/layout/logo';
import './signup.css';
import { ActionForm, Form, Action } from '../../utils/interfaces/form';
import { User } from '../../utils/interfaces/user';
import { getUsers } from '../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/useUserContext';

function reducer(data: Form, action: ActionForm) {
  switch (action.type) {
    case Action.changeUsername:
      return { ...data, username: action.value };

    case Action.changeName:
      return { ...data, name: action.value };

    case Action.changeLastname:
      return { ...data, lastname: action.value };

    case Action.changeEmail:
      return { ...data, email: action.value };

    case Action.changePassword:
      return { ...data, password: action.value };

    default:
      return data;
  }
}

const initialState: Form = {
  username: '',
  name: '',
  lastname: '',
  email: '',
  password: '',
};

export default function SignUp() {
  const user = useUserContext();
  const [dataForm, dispatch] = useReducer(reducer, initialState);
  const [users, setUsers] = useState({} as User[]);
  const navigate = useNavigate();

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const userFoundUsername = users.find((element) => {
      return element.username === dataForm.username;
    });
    const userFoundEmail = users.find((element) => {
      return element.email === dataForm.email;
    });
    if (userFoundUsername) {
      console.log('mismo username');
    } else if (userFoundEmail) {
      console.log('mismo email');
    } else {
      const newUser = await fetch('http://localhost:3000/user', {
        method: 'POST',
        body: JSON.stringify({
          ...dataForm,
          profilePicture:
            'https://res.cloudinary.com/dqm1upnhh/image/upload/v1709542929/avata-apollofy.jpg',
          myFavorites: [],
        }),
      });
      const JSONNewUser = await newUser.json();
      localStorage.setItem('user', JSON.stringify(JSONNewUser));
      user.setUser(JSONNewUser);
      navigate('/welcome');
    }
  }

  useEffect(() => {
    async function setUsersAPI() {
      const usersAPI = await getUsers();
      setUsers(usersAPI);
    }
    setUsersAPI();
  }, []);

  function handleClickBack() {
    navigate(-1);
  }

  return (
    <section className="signup">
      <section className="profile-header">
        <img
          onClick={handleClickBack}
          src="/images/left-arrow.svg"
          alt="go back icon"
        />
      </section>
      <Logo />
      <strong className="welcomeText">
        Register to start diving into new music
      </strong>
      <form className="formSignUp" onSubmit={onSubmit}>
        <Inputs
          handleChange={(ev: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: Action.changeUsername, value: ev.target.value });
          }}
          name="username"
          placeholder="username"
        />
        <Inputs
          handleChange={(ev: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: Action.changeName, value: ev.target.value });
          }}
          name="name"
          placeholder="name"
        />
        <Inputs
          handleChange={(ev: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: Action.changeLastname, value: ev.target.value });
          }}
          name="lastname"
          placeholder="last name"
        />
        <Inputs
          handleChange={(ev: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: Action.changeEmail, value: ev.target.value });
          }}
          name="email"
          type="email"
          placeholder="email"
        />
        <Inputs
          handleChange={(ev: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: Action.changePassword, value: ev.target.value });
          }}
          name="password"
          type="password"
          placeholder="password"
        />
        <Button style="btn-yellow">SIGN UP</Button>
      </form>
    </section>
  );
}
