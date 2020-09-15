import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import './styles.css';

import logo from '../../assets/logo.png';

const Header = () => {
  let local = useLocation();

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="Tmov"/>
      </Link>

      {local.pathname !== '/' && local.pathname !== '/update'
        && <Link to="/" className="backHome">
            <FiArrowLeft />
            Voltar para home
          </Link>
      }
    </header>
  )
}

export default Header;