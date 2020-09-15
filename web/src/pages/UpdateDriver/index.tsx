import React, {useEffect, useState} from 'react';
import Chatbot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import {useLocation} from 'react-router-dom';

import api from '../../services/api';

import {
  formataCnpjCpf,
  formataTelefone,
  formataEndereco,
  chatTheme
} from '../../helpers/index';

import { useMain } from '../../hooks/Main';

import Header from '../../components/header';
import Notfound from '../../components/notfound';


import './styles.css';

import {Dados} from '../../react-app-env';

const Revisar = (props:any) => {
  const {dados} = useMain();
  const [dadosAtualizado, setDadosAtualizado] = useState(false);
  const [dadosLocal, setDadosLocal] = useState<Dados>({} as Dados);
  const {
    novoEmail,
    novoTelefone,
    novoCpfCnpj,
    novoCep,
    novoNumeroResidencial
  } = props.steps
  
  useEffect(() => {
    async function formataValores() {
      const email = novoEmail ? novoEmail.value : dados.email;
      const telefone = novoTelefone
        ? formataTelefone(novoTelefone.value)
        : dados.telefone;
      const cpfCnpj = novoCpfCnpj
        ? formataCnpjCpf(novoCpfCnpj.value)
        : dados.cpfCnpj;
      const endereco = novoCep && novoNumeroResidencial
        ? await formataEndereco(novoCep.value, novoNumeroResidencial.value)
        : dados.endereco;
      
      setDadosLocal({
        id: dados.id,
        nome: dados.nome,
        email,
        telefone,
        cpfCnpj,
        endereco
      });
    }
    formataValores();
  }, [dados, novoCep, novoCpfCnpj, novoEmail, novoNumeroResidencial, novoTelefone]);

  useEffect(() => {
    
    if(dadosLocal.id === undefined || dadosAtualizado) return;
    async function handleSubmit() {
      setDadosAtualizado(true);
      await api.put(`drivers/${dadosLocal.id}`, dadosLocal);
    }
    handleSubmit();
  }, [dadosAtualizado, dadosLocal])

  return (
    <div>
      <div className="review-item">
        <b>Nome: </b>
        <span>{dadosLocal.nome}</span>
      </div>
      <div className="review-item">
        <b>CPF ou CNPJ: </b>
        <span>{dadosLocal.cpfCnpj}</span>
      </div>
      <div className="review-item">
        <b>Email: </b>
        <span>{dadosLocal.email}</span>
      </div>
      <div className="review-item">
        <b>Telefone: </b>
        <span>{dadosLocal.telefone}</span>
      </div>
      <div className="review-item">
        <b>Endereço: </b>
        <span>{dadosLocal.endereco}</span>
      </div>
    </div>
  );
}

const ShowNome = () => {
  const {dados} = useMain();

  return (
    <span>Seja bem vindo <b>{dados.nome}</b>, favor confirme para nós se os seus dados estão corretos.</span>
  );
}

const ShowEmail = (props:any) => {
  const {dados} = useMain();
  const [email, setEmail] = useState<string>(dados.email);
  const {value, id} = props.previousStep;

  useEffect(() => {
    if(id !== "novoEmail") return;
    setEmail(value);
  }, [id, value]);

  return (
    <span>O seu email é <b>{email}</b> ?</span>
  );
}

const ShowTelefone = (props:any) => {
  const {dados} = useMain();
  const [telefone, setTelefone] = useState<string>(dados.telefone);
  const {value, id} = props.previousStep;

  useEffect(() => {
    if(id !== "novoTelefone") return;
    setTelefone(formataTelefone(value));
  }, [id, value]);

  return (
    <span>O seu telefone é <b>{telefone}</b> ?</span>
  );
}

const ShowCpfCnpj = (props:any) => {
  const {dados} = useMain();
  const [cpfCnpj, setCpfCnpj] = useState<string>(dados.cpfCnpj);
  const {triggerNextStep, previousStep:{value, id}} = props;

  useEffect(() => {
    if(id !== 'telefone-question' || cpfCnpj !== null) {
      triggerNextStep({value: 'sim', trigger: 'cpfCnpj-question'})
    }else {
      triggerNextStep({value: 'nao', trigger: 'novoCpfCnpjMessage'})
    }
  }, [cpfCnpj, id, triggerNextStep])

  useEffect(() => {
    if(id !== "novoCpfCnpj") return;
    setCpfCnpj(formataCnpjCpf(value));
  }, [id, value]);

  return (
    <div>
      {cpfCnpj
        ? <span>O seu CPF ou CNPJ é <b>{cpfCnpj}</b> ?</span>
        : <span>Não possuimos o seu CPF ou CNPJ, por favor cadastre abaixo...</span>
      }
    </div>
  );
}

const ShowEndereco = (props:any) => {
  const {dados} = useMain();
  const [ cep, setCep ] = useState('');
  const [ numeroResidencia, setNumeroResidencia ] = useState('');
  const [ endereco, setEndereco ] = useState<string>(dados.endereco);
  const {triggerNextStep, previousStep:{id}, steps:{novoCep, novoNumeroResidencial}} = props;

  useEffect(() => {
    if(id !== 'cpfCnpj-question' || endereco !== null) return;
    triggerNextStep({value: 'nao', trigger: 'novoCepMessage'})
  }, [endereco, id, triggerNextStep])

  useEffect(() => {
    if( id !== "novoNumeroResidencial" ) return;
    triggerNextStep({value: 'sim', trigger: 'endereco-question'})

    async function formataCep() {
      const endereco = await formataEndereco(cep, numeroResidencia);
      setEndereco(endereco);      
    };
    formataCep();
  }, [cep, id, numeroResidencia, triggerNextStep]);

  useEffect(() => {
    if(!novoCep) return;
    setCep(novoCep.value);
  }, [novoCep])

  useEffect(() => {
    if(!novoNumeroResidencial) return;
    setNumeroResidencia(novoNumeroResidencial.value);
  }, [novoNumeroResidencial])
  
  return (
    <div>
      {endereco
        ? <span>O seu endereço é <b>{endereco}</b> ?</span>
        : <span>Não possuimos o seu endereço, cadastre um fazendo favor...</span>
      }
    </div>
  );
}

const ChatUpdate = () => {
  const {setDadosDriver} = useMain();
  const {search} = useLocation();

  useEffect(() => {
    async function SearchDriver() {
      if(!search.includes('id')) return;
      
      const id = search.split("=")[1];
      const response = await api.get(`drivers/${id}`);
      setDadosDriver(response.data);
    }
    SearchDriver();
  }, [search, setDadosDriver]);

  const steps = [
    {
      id: 'bot_1',
      message: `Olá motorista, seja bem vindo a atualização de cadastro da Sotran. Para começarmos, digite seu nome completo`,
      trigger: 'showNome',
    },
    {
      id: 'showNome',
      component: <ShowNome />,
      asMessage: true,
      trigger: 'showEmail',
    },
    {
      id: 'showEmail',
      component: <ShowEmail />,
      asMessage: true,
      trigger: 'email-question',
    },
    {
      id: 'email-question',
      options: [
        { value: 'sim', label: 'Sim', trigger: 'showTelefone' },
        { value: 'nao', label: 'Não', trigger: 'novoEmailMessage' },
      ],
    },
    {
      id: 'novoEmailMessage',
      message: 'Favor, insira seu novo endereço de email',
      trigger: 'novoEmail',
    },
    {
      id: 'novoEmail',
      user: true,
      trigger: 'showEmail',
      validator: (value:string) => {
        return value.length === 0
          ? 'Digite um email válido'
          : true;
      }
    },
    {
      id: 'showTelefone',
      component: <ShowTelefone />,
      asMessage: true,
      trigger: 'telefone-question',
    },
    {
      id: 'telefone-question',
      options: [
        { value: 'sim', label: 'Sim', trigger: 'showCpfCnpj' },
        { value: 'nao', label: 'Não', trigger: 'novoTelefoneMessage' },
      ],
    },
    {
      id: 'novoTelefoneMessage',
      message: 'Favor, insira seu novo número de telefone com DDD',
      trigger: 'novoTelefone',
    },
    {
      id: 'novoTelefone',
      user: true,
      trigger: 'showTelefone',
      placeholder: '4337113800',
      validator: (value:number) => {
        return isNaN(value) || value.toString().length === 0
          ? 'Digite um telefone válido'
          : true;
      }
    },
    {
      id: 'showCpfCnpj',
      component: <ShowCpfCnpj />,
      asMessage: true,
      waitAction: true,
    },
    {
      id: 'cpfCnpj-question',
      options: [
        { value: 'sim', label: 'Sim', trigger: 'showEndereco' },
        { value: 'nao', label: 'Não', trigger: 'novoCpfCnpjMessage' },
      ],
    },
    {
      id: 'novoCpfCnpjMessage',
      message: 'Favor, insira seu novo CPF ou CNPJ',
      trigger: 'novoCpfCnpj',
    },
    {
      id: 'novoCpfCnpj',
      user: true,
      trigger: 'showCpfCnpj',
      validator: (value:number) => {
        return isNaN(value) || value.toString().length < 11
          ?  'CPF ou CNPJ inválido'
          : true;
      }
    },
    {
      id: 'showEndereco',
      component: <ShowEndereco />,
      asMessage: true,
      waitAction: true,
    },
    {
      id: 'endereco-question',
      options: [
        { value: 'sim', label: 'Sim', trigger: 'revisar' },
        { value: 'nao', label: 'Não', trigger: 'novoCepMessage' },
      ],
    },
    {
      id: 'novoCepMessage',
      message: 'Favor, insira o CEP de sua nova residência',
      trigger: 'novoCep',
    },
    {
      id: 'novoCep',
      user: true,
      trigger: 'novoNumeroResidencialMessage',
      validator: (value:string) => {
        return value.replace(/\D/g,"").length < 8
          ? 'CEP inválido'
          : true;
      }
    },
    {
      id: 'novoNumeroResidencialMessage',
      message: 'Favor, insira o número de sua nova residência',
      trigger: 'novoNumeroResidencial',
    },
    {
      id: 'novoNumeroResidencial',
      user: true,
      trigger: 'showEndereco',
      validator: (value:number) => {
        return isNaN(value) || value.toString().length === 0
          ? 'Digite um número válido'
          : true;
      }
    },
    {
      id: 'revisar',
      component: <Revisar />,
      asMessage: true,
      trigger: 'finalizar'
    },
    {
      id: 'finalizar',
      message: 'A sotran agradeçe sua colaboração! Juntos, moveremos o país!',
      end: true
    }
  ]

  if(!search.includes('id')) return <Notfound />;

  return (
    <div id="chat_update">
      <div className="content">
        <Header />
        <main>
          <ThemeProvider theme={chatTheme}>
            <Chatbot
              steps={steps}
              headerTitle="Atualização de Cadastro"
              placeholder="Escrever mensagem..."
              enableMobileAutoFocus={true}
              width="100%"
            />
          </ThemeProvider>
        </main>
      </div>
    </div>
  );
}

export default ChatUpdate;