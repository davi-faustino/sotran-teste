import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Swal from 'sweetalert2'
import InfoDrivers from '../infoDrivers';

import './styles.css';

import {Driver} from '../../react-app-env';

interface Props {
  drivers:Driver[]
}

const DataDrivers: React.FC<Props>  = ({ drivers }) => {
  function showDriverInfo(id:number) {
    const driver = drivers[id];
    Swal.fire({
      html: renderToStaticMarkup(<InfoDrivers driver={driver} />)
    });
  }

  return (
    <div className="data-drivers">
      {
        !drivers.length
          ? <strong>Nenhum dado encontrado</strong>
          : <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver, index) => (
                  <tr key={index} onClick={() => showDriverInfo(index)}>
                    <td>{driver.nome}</td>
                    <td>{driver.email}</td>
                    <td>{driver.telefone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
      }
    </div>
  );
}

export default DataDrivers;