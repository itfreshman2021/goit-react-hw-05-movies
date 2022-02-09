import React from 'react';
import { NavLink } from 'react-router-dom';
import mainRoutes from '../../routes/mainRoutes';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav>
      <ul className={s.navList}>
        {mainRoutes.map(({ path, name }) => (
          <li className={s.navListItem} key={path}>
            <NavLink
              to={path}
              className={({ isActive }) => (isActive ? `${s.navItemActive}` : `${s.navItem}`)}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
