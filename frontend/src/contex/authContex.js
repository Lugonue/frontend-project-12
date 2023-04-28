import React from 'react';


const AuthContext = React.createContext({ authorized: false, setAuth: () => {} });

export default AuthContext;