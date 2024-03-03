import './profile.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/global/button';
import { Inputs } from '../../components/global/inputs';
import { useUserContext } from '../../context/useUserContext';

export function Profile() {
  const user = useUserContext();
  const navigate = useNavigate();
  function handleClickLogOut() {
    localStorage.removeItem('user');
    navigate('/');
  }
  function handleClickSave() {}
  function handleClickDelete() {}

  return (
    <section className="profile-section">
      <img
        className="img-profile"
        src={user.user.profilePicture}
        alt={`${user.user.username} image`}
      />
      <p className="name">{`${user.user.name} ${user.user.lastname}`}</p>
      <form className="form-section">
        <label>
          Username
          <Inputs name="username" placeholder={user.user.username} />
        </label>
        <label>
          Email
          <Inputs name="email" placeholder={user.user.email} />
        </label>
        <label>
          New password
          <Inputs name="new_pass" placeholder="" />
        </label>
        <label>
          Confirm password
          <Inputs name="new_pass" placeholder="" />
        </label>
      </form>
      <Button style="btn-yellow" handleClick={handleClickSave}>
        SAVE CHANGES
      </Button>
      <section className="buttons">
        <Button style="btn-white" handleClick={handleClickLogOut}>
          LOG OUT
        </Button>
        <Button style="btn-white" handleClick={handleClickDelete}>
          DELETE USER
        </Button>
      </section>
    </section>
  );
}
