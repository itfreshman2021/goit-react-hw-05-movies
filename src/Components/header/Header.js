import React from 'react';
import Navigation from '../navigation/Navigation';
import s from './Header.module.css';

const Header = () => {
  return (
    <div className={s.Header}>
      <Navigation />
    </div>
  );
};

export default Header;
