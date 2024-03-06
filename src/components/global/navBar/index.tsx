import './navBar.css';
import { NavLink } from 'react-router-dom';

export function NavBar() {
  return (
    <section className="navbar">
      <NavLink to="/welcome">
        <img src="/images/home.svg" alt="home icon" />
        <img className="point" src="/images/ellipse.svg" />
      </NavLink>
      <NavLink to="/favourites">
        <img src="/images/favs.svg" alt="fav music icon" />
        <img className="point" src="/images/ellipse.svg" />
      </NavLink>
      <NavLink to="/profile">
        <img src="/images/user.svg" alt="profile icon" />
        <img className="point" src="/images/ellipse.svg" />
      </NavLink>
    </section>
  );
}
