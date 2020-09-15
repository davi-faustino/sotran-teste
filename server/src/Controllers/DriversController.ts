import {Request, Response} from 'express';
import path from 'path';
import knex from '../database/connection';
import nodemailer from '../config/nodemailer';

interface Driver {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  endereco: string;
}

class DriversController {
  async index(request: Request, response: Response) {
    const { page } = request.query;

    const drivers = await knex('drivers').paginate({
      perPage: 10,
      currentPage: Number(page)
    });
  
    return response.json(drivers);
  }
  
  async filter(request: Request, response: Response) {
    const { filter, page } = request.query;
    let drivers;

    if(filter === 'atualizados') {
      drivers = await knex('drivers')
        .whereNotNull('endereco')
        .orWhereNotNull('cpfCnpj')
        .paginate({
          perPage: 10,
          currentPage: Number(page)
        });
    }else {
      drivers = await knex('drivers')
        .whereNull('endereco')
        .orWhereNull('cpfCnpj')
        .paginate({
          perPage: 10,
          currentPage: Number(page)
        });
    }
    
    return response.json(drivers);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const drivers = await knex('drivers').where('id', id).first();

    if(!drivers) {
      return response.status(400).json({message: 'Motorista não encontrado.'});
    }

    return response.json(drivers);
  }

  async create(request: Request, response: Response){
    const { nome, email, telefone, cpfCnpj, endereco } = request.body;
    let message = {};
    
    if(request.file) {
      const file = path.resolve('.', 'uploads', request.file.filename);
      await knex.raw(`copy drivers(nome,telefone,email) FROM '${file}' DELIMITER ',' CSV HEADER`)
      ? message = {message: 'Dados importados com sucesso'}
      : message = {message: 'Ocorreu um erro ao importar dados, tente novamente'};

      this.sendMailForDrivers;
    }else {
      const driver = { nome, email, telefone, cpfCnpj, endereco };
      await knex('drivers').insert(driver)
      ? message = {message: 'Motorista cadastrado com sucesso', driver}
      : message = {message: 'Ocorreu um erro ao cadastrar, tente novamente'};
    }

    return response.json(message);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, email, telefone, cpfCnpj, endereco } = request.body;
    const driver = { nome, email, telefone, cpfCnpj, endereco };
    let message = {};
    
    await knex('drivers').update(driver).where('id', id)
    ? message = {message: 'Dados atualizados com sucesso', driver}
    : message = {message: 'Ocorreu um erro ao atualizar dados, tente novamente'};

    return response.json(message);
  }

  async sendMailForDrivers(request: Request, response: Response) {
    const drivers = await knex('drivers')
      .select('*')
      .whereNull('endereco')
      .orWhereNull('cpfCnpj');

    drivers.map(async (driver:Driver) => {
      await nodemailer.sendMail(driver.id, driver.nome, driver.email);
    });

    return response.json({message: 'Emails enviado com sucesso!'});
  }
}

export default DriversController;