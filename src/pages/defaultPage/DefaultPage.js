import React from 'react';
import { Link } from 'react-router-dom';

const DefaultPage = () => {
  return (
    <p>
      Sorry, page is not found. Go to <Link to="/">Home</Link>
    </p>
  );
};

export default DefaultPage;
