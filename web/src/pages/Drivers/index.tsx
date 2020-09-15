import React, {useEffect, useState} from 'react';
import Pagination from "react-js-pagination";

import api from '../../services/api';
import Header from '../../components/header';
import DataDrivers from '../../components/dataDrivers';

import './styles.css';

import {Driver, Paginate} from '../../react-app-env';

interface Data {
  data: {
    data: Driver[];
    pagination: Paginate;
  };
}

const Drivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [pagination, setPagination] = useState<Paginate>({
    currentPage: 1
  } as Paginate);
  const [total, setTotal] = useState<number>(0);
  const [filterActive, setFilterActive] = useState<string>('');

  useEffect(() => {
    if(filterActive !== '') return;

    async function loadDrivers() {
      const response:Data = await api.get(`drivers?page=1`);
      const {data, pagination} = response.data;

      setDrivers(data);
      setPagination(pagination);
      setTotal(pagination.total);
    }
    loadDrivers();
  }, [filterActive]);

  async function handlePageChange(page:number) {
    const response:Data = filterActive === ''
      ? await api.get(`drivers?page=${page}`)
      : await api.get(`drivers/filter?filter=${filterActive}&page=${page}`);
    
    const {data, pagination} = response.data;
    
    setDrivers(data);
    setPagination(pagination);
  }

  async function filter(filter:string) {
    if(filterActive === filter) return setFilterActive('');
    
    const response:Data = await api.get(`drivers/filter?filter=${filter}&page=1`);
    const {data, pagination} = response.data;

    setDrivers(data);
    setPagination(pagination);
    setTotal(pagination.total);
    setFilterActive(filter);
  }

  return (
    <div id="page-drivers">
      <div className="content">
        <Header />

        <main>
          <h1>Motoristas</h1>
          <div className="actions">
            <div className="filters">
              <button
                className={
                  filterActive === 'atualizados' ? 'active' : ''
                }
                onClick={() => filter('atualizados')}>
                <strong>Atualizados</strong>
              </button>

              <button
                className={
                  filterActive === 'desatualizados' ? 'active' : ''
                }
                onClick={() => filter('desatualizados')}>
                <strong>Desatualizados</strong>
              </button>
            </div>

            <div className="paginator">
              <Pagination
                activePage={pagination.currentPage}
                itemsCountPerPage={10}
                totalItemsCount={total}
                pageRangeDisplayed={4}
                hideDisabled
                onChange={(page) => handlePageChange(page)}
              />
            </div>
          </div>
          <DataDrivers drivers={drivers} />
          <small>{total} registros encontrados</small>
        </main>
      </div>
    </div>
  )
}

export default Drivers;