import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

import Logo from "./Logo";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <NavLink to="/pricing">pricing</NavLink>
        <NavLink to="/product">product</NavLink>
        <NavLink to="/login">login</NavLink>
      </ul>
    </nav>
  );
}

export default PageNav;
