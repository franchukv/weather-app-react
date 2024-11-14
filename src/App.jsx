import Dashboard from './components/Dashboard';
import { AppContextProvider } from './context/AppContext';

const App = () => {
  return (
    <div className="App">
      <AppContextProvider>
        <Dashboard />
      </AppContextProvider>
    </div>
  );
};

export default App;
