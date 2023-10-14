import React, {Component, useContext} from 'react';

// const realm = Database.getRealmInstance();

import Routes from './src/Screens/routes';
import AuthState from './src/Screens/context/authContext';

const App = () => {
  return (
    <AuthState>
      <Routes />
    </AuthState>
  );
};

export default App;
