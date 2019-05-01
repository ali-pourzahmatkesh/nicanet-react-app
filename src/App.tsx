import React from 'react';
import AppRouter from './router/AppRouter';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'

import { store, history } from './Redux/ConfigureStore'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppRouter />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
