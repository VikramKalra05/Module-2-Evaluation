import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({children}){
    const [isAuth, setAuth] = useState(true);

    return (
        <AuthContext.Provider value={{isAuth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}