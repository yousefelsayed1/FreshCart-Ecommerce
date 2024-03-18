import { useEffect, useState } from "react";
import { createContext } from "react"


export let userContext = createContext();

export default function UserContextProvider(myProps) {

    let [userToken, setToken] = useState(null);
    let[userData, setUserData] = useState(null)

    return <userContext.Provider value={{userToken, setToken, userData, setUserData}}>
        {myProps.children}
    </userContext.Provider>
}
