/// <reference types="react-scripts" />

export interface Dados {
  id: number | undefined;
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  endereco: string;
}

export interface Driver {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  endereco: string;
}

export interface Paginate {
  currentPage: number;
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
}