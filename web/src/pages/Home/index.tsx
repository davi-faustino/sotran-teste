import React from 'react';
import { Link } from "react-router-dom";
import { FiEdit, FiBook } from "react-icons/fi";

import Header from '../../components/header';
import Chat from '../NewDrivers1';

import './styles.css';

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <Header />

        <main>
          <h1>
            Seja bem vindo ao gerenciador de motoristas da
            <strong className="text_important"> Sotran</strong>.
          </h1>

          <div className="links">
            <Link to="/newdrivers">
              <span>
                <FiEdit />
              </span>
              <strong>Cadastre Motoristas</strong>
            </Link>

            <Link to="/drivers">
              <span>
                <FiBook />
              </span>
              <strong>Consultar Motoristas</strong>
            </Link>
          </div>
        </main>
      </div>

      <Chat />
    </div>
  )
}

export default Home;