import useApp from '../hooks/useApp';
import { ForecastContextProvider } from '../context/ForecastContext';
import Logo from './UI/Logo';
import SearchForm from './SearchForm';
import Panel from './Panel';
import Details from './Details';
import WeekForecast from './WeekForecast';

const Dashboard = () => {
  const { isForecastActive, isForecastLoading } = useApp();

  return (
    <section
      className={`dashboard  ${isForecastActive ? 'active' : ''} ${
        isForecastLoading ? 'loading' : ''
      }`}
    >
      <div className="container">
        <div className="wrapper">
          <ForecastContextProvider>
            <div className="dashboard__main">
              <Logo />

              {!isForecastActive && (
                <div className="dashboard__greetings">
                  <h1 className="dashboard__title">
                    Welcome to <mark>TypeWeather</mark>
                  </h1>
                  <p>Choose a location to see the weather forecast</p>
                </div>
              )}

              <SearchForm />

              {isForecastActive && <Panel />}
            </div>

            {isForecastActive && (
              <aside className="dashboard__sidebar">
                <div className="dashboard__plate dashboard__plate--today">
                  <h5 className="dashboard__subtitle">Weather details today</h5>

                  <Details />
                </div>

                <div className="dashboard__plate dashboard__plate--week">
                  <h5 className="dashboard__subtitle">5 day forecast</h5>

                  <WeekForecast />
                </div>
              </aside>
            )}
          </ForecastContextProvider>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
