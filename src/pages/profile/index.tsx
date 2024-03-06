import './profile.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/global/button';
import { Inputs } from '../../components/global/inputs';
import { useUserContext } from '../../context/useUserContext';
import { ChangeEvent, useReducer } from 'react';
import { Action, ActionForm, Form } from '../../utils/interfaces/form';
import { NavBar } from '../../components/global/navBar';
import { useSongContext } from '../../context/useSongContext';

const initialState: Form = {
  username: '',
  name: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
};

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

    case Action.changeConfirmPassword:
      return { ...data, confirmPassword: action.value };

    default:
      return data;
  }
}

export function Profile() {
  const navigate = useNavigate();
  const user = useUserContext();
  const { setCurrentSong } = useSongContext();
  const [data, dispatch] = useReducer(reducer, initialState);
  function handleClickLogOut() {
    localStorage.removeItem('user');
    navigate('/');
    setCurrentSong({});
  }
  function handleClickBack() {
    navigate(-1);
  }
  function handleClickSave() {
    if (data.username.trim() !== '') {
      fetch(`http://localhost:3000/user/${user.user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          username: data.username.trim(),
        }),
      });
    }
    if (data.name.trim() !== '') {
      fetch(`http://localhost:3000/user/${user.user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: data.name.trim(),
        }),
      });
    }
    if (data.lastname.trim() !== '') {
      fetch(`http://localhost:3000/user/${user.user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          lastname: data.lastname.trim(),
        }),
      });
    }
    if (data.email.trim() !== '') {
      fetch(`http://localhost:3000/user/${user.user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          email: data.email.trim(),
        }),
      });
    }
    if (
      data.password.trim() !== '' &&
      data.password.trim() === data.confirmPassword?.trim()
    ) {
      fetch(`http://localhost:3000/user/${user.user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          password: data.password.trim(),
        }),
      });
    }
  }
  function handleClickDelete() {
    fetch(`http://localhost:3000/user/${user.user.id}`, {
      method: 'DELETE',
    });
    navigate('/');
    localStorage.removeItem('user');
  }

  return (
    <section className="profile-section">
      <section className="profile-header">
        <img
          onClick={handleClickBack}
          src="/images/left-arrow.svg"
          alt="go back icon"
        />
      </section>
      <img
        className="img-profile"
        src={user.user.profilePicture}
        alt={`${user.user.username} image`}
      />
      <p className="name">{`${user.user.name} ${user.user.lastname}`}</p>
      <form className="form-section">
        <label>
          Username
          <Inputs
            handleChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: Action.changeUsername, value: e.target.value });
            }}
            name="username"
            placeholder={user.user.username}
          />
        </label>
        <label>
          Name
          <Inputs
            handleChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: Action.changeName, value: e.target.value });
            }}
            name="name"
            placeholder={user.user.name}
          />
        </label>
        <label>
          Last name
          <Inputs
            handleChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: Action.changeLastname, value: e.target.value });
            }}
            name="lastname"
            placeholder={user.user.lastname}
          />
        </label>
        <label>
          Email
          <Inputs
            handleChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: Action.changeEmail, value: e.target.value });
            }}
            type="email"
            name="email"
            placeholder={user.user.email}
          />
        </label>
        <label>
          New password
          <Inputs
            handleChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: Action.changePassword, value: e.target.value });
            }}
            type="password"
            name="new_pass"
            placeholder=""
          />
        </label>
        <label>
          Confirm password
          <Inputs
            handleChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({
                type: Action.changeConfirmPassword,
                value: e.target.value,
              });
            }}
            type="password"
            name="new_pass"
            placeholder=""
          />
        </label>
      </form>
      <Button style="btn-yellow" handleClick={handleClickSave}>
        SAVE CHANGES
      </Button>
      <section className="buttons">
        <button onClick={handleClickLogOut}>LOG OUT</button>
        <button className="delete-btn" onClick={handleClickDelete}>
          DELETE USER
        </button>
      </section>
      <NavBar />
    </section>
  );
}
