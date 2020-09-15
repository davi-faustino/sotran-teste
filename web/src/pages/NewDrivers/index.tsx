import React, {useRef, useState, ChangeEvent, FormEvent} from 'react';
import Swal from 'sweetalert2'
import * as Joi from "@hapi/joi";

import api from '../../services/api';
import Dropzone from '../../components/Dropzone';
import Header from '../../components/header';

import {
  formataCnpjCpf,
  formataTelefone,
  formataEndereco,
} from '../../helpers/index';

import './styles.css';

const NewDrivers = () => {
  const refForm:any = useRef();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpfCnpj: '',
    cep: '',
    endereco: '',
    numeroResidencia: ''
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target;

    setFormData({...formData, [name]: value});
  }

  async function formatarDado(dado:string) {
    if(dado === 'cpfCnpj') {
      const dadoFormatado = formataCnpjCpf(formData.cpfCnpj);
      setFormData({...formData, cpfCnpj: dadoFormatado});
    }else if(dado === 'telefone') {
      const dadoFormatado = formataTelefone(formData.telefone);
      setFormData({...formData, telefone: dadoFormatado});
    }else if(dado === 'endereco') {
      const dadoFormatado = await formataEndereco(formData.cep, formData.numeroResidencia)
      setFormData({...formData, endereco: dadoFormatado});
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    Swal.fire({
      icon: 'info',
      title: 'Aguarde!',
      text: 'Aguarde até o processo ser concluido!', 
    });

    const data = new FormData(refForm.current);
    
    try {
      selectedFile
        ? data.append('file', selectedFile)
        : await schema.validateAsync(formData);
    }
    catch (err) {
      Swal.fire('Erro', 'Preencha todos os campos ou selecione um arquivo!', 'error');

      return;
    }

    const response = await api.post('drivers', data);

    if(response.data.message) {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Motoristas cadastrado com sucesso!', 
        timer: 1500
      });

      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cpfCnpj: '',
        cep: '',
        endereco: '',
        numeroResidencia: ''
      });

      setSelectedFile(undefined);
    }

  }

  const schema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email({ tlds: {allow: false} }),
    telefone: Joi.string().required(),
    cpfCnpj: Joi.string().required(),
    endereco: Joi.string().required(),
    cep: Joi.string().optional(),
    numeroResidencia: Joi.string().required()
  });

  return (
    <div id="new-drivers">
      <div className="content">
        <Header />

        <main>
          <form onSubmit={handleSubmit} ref={refForm}>
            <h1>Cadastrar Motorista</h1>
            <Dropzone onFileUploaded={setSelectedFile} />

            <fieldset>
              <legend>
                <h2>Dados</h2>
              </legend>

              <div className="field-group">
                <div className="field">
                  <label htmlFor="nome">Nome do Motorista</label>
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="field">
                  <label htmlFor="cpfCnpj">CPF ou CNPJ</label>
                  <input
                    type="text"
                    name="cpfCnpj"
                    id="cpfCnpj"
                    maxLength={18}
                    value={formData.cpfCnpj}
                    onChange={handleInputChange}
                    onBlur={() => formatarDado('cpfCnpj')}
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
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="field">
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    type="text"
                    name="telefone"
                    id="telefone"
                    maxLength={15}
                    value={formData.telefone}
                    onChange={handleInputChange}
                    onKeyUp={() => formatarDado('telefone')}
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="field">
                  <label htmlFor="cep">CEP</label>
                  <input
                    type="text"
                    name="cep"
                    id="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="numeroResidencia">Número da Residência</label>
                  <input
                    type="text"
                    name="numeroResidencia"
                    id="numeroResidencia"
                    value={formData.numeroResidencia}
                    onChange={handleInputChange}
                    onBlur={() => formatarDado('endereco')}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="endereco">Endereço</label>
                <input
                  type="text"
                  name="endereco"
                  id="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>

            <button type="submit">Cadastrar Motorista</button>
          </form>
        </main>
      </div>
    </div>
  )
}

export default NewDrivers;