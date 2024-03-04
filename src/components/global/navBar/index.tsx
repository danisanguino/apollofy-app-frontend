import './navBar.css';
import { NavLink } from 'react-router-dom';

type Props = {};

export function NavBar(props: Props) {
  return (
    <section className="navbar">
      <NavLink to="/welcome">
        <img src="src/assets/images/home.svg" alt="home icon" />
        <img className="point" src="src/assets/images/ellipse.svg" />
      </NavLink>
      <NavLink to="/favourites">
        <img src="src/assets/images/favs.svg" alt="fav music icon" />
        <img className="point" src="src/assets/images/ellipse.svg" />
      </NavLink>
      <NavLink to="/profile">
        <img src="src/assets/images/user.svg" alt="profile icon" />
        <img className="point" src="src/assets/images/ellipse.svg" />
      </NavLink>
    </section>
  );
}
