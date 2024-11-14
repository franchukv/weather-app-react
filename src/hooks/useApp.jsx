import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useApp = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    console.error('useApp must be used within a AppContextProvider');
  }

  return appContext;
};

export default useApp;
