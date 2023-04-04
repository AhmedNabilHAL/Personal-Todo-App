import { createContext, useContext } from 'react';

const userContext = createContext(null);

export function UserProvider({ children, user }){

  return (
    <userContext.Provider value={user}>
        {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
    return useContext(userContext);
}
