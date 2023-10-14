import React, {createContext, useState} from 'react';

export const AuthContext = createContext({
  authenticated: false,
  userData: {
    fullName: '',
    expiry: '',
  },
  setUserData: value => null,
  setAuthenticated: value => null,
});

const AuthState: React.FC<any> = ({children}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    expiry: '',
  });

  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        userData: userData,
        setUserData: setUserData,
        setAuthenticated: setAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
