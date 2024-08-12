
import { BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './providers/store';
import AUTH_ROUTE from './routes/auth.routes';
import DASHBOARD_ROUTE from './routes/dashboard.routes';
function App() {
  return (
    <>
      <Provider store={Store}>
        <BrowserRouter>
          <DASHBOARD_ROUTE />
          <AUTH_ROUTE />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
