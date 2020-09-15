import React from 'react';

import './styles.css'

import {Driver} from '../../react-app-env';

interface Props {
  driver:Driver
}

const InfoDrivers: React.FC<Props>  = ({ driver }) => {
  return (
    <div id="info-drivers">
      <h1>Dados Motorista</h1>
      <fieldset>
        <div className="field-group">
          <div className="field">
            <label htmlFor="nome">Nome do Motorista</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={driver.nome}
              readOnly={true}
            />
          </div>

          <div className="field">
            <label htmlFor="cpfCnpj">CPF ou CNPJ</label>
            <input
              type="text"
              name="cpfCnpj"
              id="cpfCnpj"
              value={driver.cpfCnpj}
              readOnly={true}
            />
          </div>
        </div>

        <div className="field-group">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={driver.email}
              readOnly={true}
            />
          </div>
          
          <div className="field">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              name="telefone"
              id="telefone"
              value={driver.telefone}
              readOnly={true}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            name="endereco"
            id="endereco"
            value={driver.endereco}
            readOnly={true}
          />
        </div>
      </fieldset>
    </div>
  );
}

export default InfoDrivers;