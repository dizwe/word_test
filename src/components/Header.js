import React from 'react';
// import './components/Header.css';
// 링크 만듦.
import {Link} from 'react-router-dom';

const Header = ()=>{
  return(
    <div className ="header">
      <Link to="/">Home</Link>
      <Link to="/input">Input</Link>
      <Link to="/test">test</Link>

    </div>
  );
};

export default Header;
