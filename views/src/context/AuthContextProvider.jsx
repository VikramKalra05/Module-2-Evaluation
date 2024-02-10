import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({children}){
    const [number, setNumber] = useState(0);
    const [isAuth, setAuth] = useState(true);

    return (
        <AuthContext.Provider value={{isAuth, setAuth, number, setNumber}}>
            {children}
        </AuthContext.Provider>
    )
}