import React, {useEffect, useState} from 'react';
import Chatbot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

import api from '../../services/api';

import {
  formataCnpjCpf,
  formataTelefone,
  formataEndereco,
  chatTheme
} from '../../helpers/index';
import { useMain } from '../../hooks/Main';

import './styles.css';

const Review = (props:any) => {
  const {dados, setDadosDriver} = useMain();
  
  useEffect(() => {
    async function formataValores() {
      const {nome, email, telefone, cpfCnpj, cep, numero_residencia} = props.steps
      const telefoneFormatado = formataTelefone(telefone.value);
      const cnpjCpfFormatado = formataCnpjCpf(cpfCnpj.value);
      const endereco = await formataEndereco(cep.value, numero_residencia.value);
      
      setDadosDriver({
        id: undefined,
        nome: nome.value,
        email: email.value,
        telefone: telefoneFormatado,
        cpfCnpj: cnpjCpfFormatado,
        endereco: endereco
      });
    }
    formataValores();
  }, [props.steps, setDadosDriver]);

  useEffect(() => {
    if(dados) return;
    async function handleSubmit() {
      await api.post('drivers', dados);
    }

    handleSubmit();
  }, [dados])

  return (
    <div>
      <div className="review-item">
        <b>Nome: </b>
        <span>{dados.nome}</span>
      </div>
      <div className="review-item">
        <b>CPF ou CNPJ: </b>
        <span>{dados.cpfCnpj}</span>
      </div>
      <div className="review-item">
        <b>Email: </b>
        <span>{dados.email}</span>
      </div>
      <div className="review-item">
        <b>Telefone: </b>
        <span>{dados.telefone}</span>
      </div>
      <div className="review-item">
        <b>Endereço: </b>
        <span>{dados.endereco}</span>
      </div>
    </div>
  );
}

const ChatCadastro = () => {
  const [reloadChat, setReloadChat] = useState<boolean>(false);

  //Esse efeito tem como funcionalidade recarregar o chat toda vez que ele for fechado
  //Essa é a unica maneira até o momento para se fazer isso ou passando uma função no HandleEnd
  useEffect(() => {
    const buttonClose = document.querySelector('.rsc-header-close-button');

    if(buttonClose) {
      buttonClose.addEventListener('click', () => {
        setReloadChat(true);
        setReloadChat(false);
      });
    }
  })

  const steps = [
    {
      id: 'bot_1',
      message: 'Olá operador, seja bem vindo ao cadastro de motoristas da Sotran. Para começarmos, digite o nome completo do motorista',
      trigger: 'nome',
    },
    {
      id: 'nome',
      user: true,
      trigger: 'bot_2',
      validator: (value:string) => {
        return value.length === 0
          ? 'Digite um nome válido'
          : true;
      }
    },
    {
      id: 'bot_2',
      message: `Certo, agora precisamos do email do motorista`,
      trigger: 'email',
    },
    {
      id: 'email',
      user: true,
      trigger: 'bot_3',
      validator: (value:string) => {
        return value.length === 0
          ? 'Digite um email válido'
          : true;
      }
    },
    {
      id: 'bot_3',
      message: `Agora sabe me dizer qual o telefone do motorista (apenas números)`,
      trigger: 'telefone',
    },
    {
      id: 'telefone',
      user: true,
      trigger: 'bot_4',
      placeholder: '4337113800',
      validator: (value:number) => {
        return isNaN(value) || value.toString().length === 0
          ? 'Digite um telefone válido'
          : true;
      }
    },
    {
      id: 'bot_4',
      message: `Agora precisa do CPF ou CNPJ do motorista (apenas números)`,
      trigger: 'cpfCnpj',
    },
    {
      id: 'cpfCnpj',
      user: true,
      trigger: 'bot_5',
      validator: (value:number) => {
        return isNaN(value) || value.toString().length < 11
          ?  'CPF ou CNPJ inválido'
          : true;
      }
    },
    {
      id: 'bot_5',
      message: `Agora preciso do CEP para encontrar o endereço`,
      trigger: 'cep',
    },
    {
      id: 'cep',
      user: true,
      trigger: 'bot_6',
      validator: (value:string) => {
        return value.replace(/\D/g,"").length < 8
          ? 'CEP inválido'
          : true;
      }
    },
    {
      id: 'bot_6',
      message: `Agora preciso do número da residência para finalizar`,
      trigger: 'numero_residencia',
    },
    {
      id: 'numero_residencia',
      user: true,
      trigger: 'bot_7',
      validator: (value:number) => {
        return isNaN(value) || value.toString().length === 0
          ? 'Digite um número válido'
          : true;
      }
    },
    {
      id: 'bot_7',
      message: 'Obrigado! Cadastro realizado com sucesso!',
      trigger: 'revisar',
    },
    {
      id: 'revisar',
      component: <Review />,
      asMessage: true,
      end: true
    },
  ]

  return (
    <ThemeProvider theme={chatTheme}>
      {reloadChat 
        ? <div />
        : <Chatbot
            floating={true}
            steps={steps}
            headerTitle="Cadastro de Motorista"
            placeholder="Escrever mensagem..."
            enableMobileAutoFocus={true}
            width="35%"
          />
      }
    </ThemeProvider>
  );
}

export default ChatCadastro;