import React from 'react';

import { MainProvider } from './Main';

const AppProvider: React.FC = ({children}) => (
  <MainProvider>{children}</MainProvider>
);

export default AppProvider;