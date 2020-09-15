import React, {
  createContext,
  useState,
  useContext,
  useCallback
} from 'react';

interface Dados {
  id: number | undefined;
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  endereco: string;
}

interface MainContextData {
  dados: Dados;
  setDadosDriver(dados: Dados): Promise<void>;
}

const MainContext = createContext<MainContextData>({} as MainContextData);

const MainProvider: React.FC = ({children}) => {
  const [dados, setDados] = useState<Dados>({} as Dados);
  
  const setDadosDriver = useCallback(async (driver) => {
    setDados(driver);
    return;
  }, []);

  return (
    <MainContext.Provider
      value={{ dados, setDadosDriver }}
    >
      {children}
    </MainContext.Provider>
  );
};

function useMain(): MainContextData {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useAuth must be used whitin an authProvider');
  }

  return context;
}

export { MainProvider, useMain };
