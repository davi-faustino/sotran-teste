import cep from 'cep-promise';

export const handleSearchCep = async (cepMotorista:string) => {
  cepMotorista = cepMotorista.replace(/\D/g,"");
  if(!cepMotorista || cepMotorista.length < 8) return false;

  const cepInfo = await cep(cepMotorista);

  return cepInfo;
}

export const formataTelefone = (telefone:string) => {
  let telefoneFormatado = telefone.replace(/\D/g,"")
    .replace(/^(\d{2})(\d)/g,"($1) $2")
    .replace(/(\d)(\d{4})$/,"$1-$2");
  
  return telefoneFormatado;
}

export const formataCnpjCpf = (cpfCnpj:string) => {
  let cnpjCpf = cpfCnpj.replace(/\D/g, '');
  if(!cnpjCpf || cnpjCpf.length < 11) return 'CPF ou CNPJ inválido';

  cnpjCpf = cnpjCpf.length === 11
  ? cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
  : cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
  
  return cnpjCpf;
}

export const formataEndereco = async (cep:string, numeroResidencia:string) => {
  const cepInfo = await handleSearchCep(cep);
  if(!cepInfo) return 'CEP inválido';

  const {street, city, state, neighborhood} = cepInfo;
  
  return `${street}, ${numeroResidencia}, ${neighborhood}, ${city} - ${state}`;
}

export const chatTheme = {
  background: '#f5f8fb',
  fontFamily: 'Arial',
  headerBgColor: '#0ce535',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#6C6C80',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};