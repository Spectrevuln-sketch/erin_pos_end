import React, { createContext, useEffect, useState } from "react";
import { ApiUser } from '../Utils/axiosInstance'
const AuthContext = createContext()

const AtuhContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(null)


    useEffect(() => {
        GetLoggin()
    }, [])

    const GetLoggin = async () => {
        const loggedInRes = await ApiUser.get('/islogin')
        console.log(loggedInRes);
        setLoggedIn(loggedInRes.data)
    }

    return (
        <AuthContext.Provider value={{ loggedIn, GetLoggin }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContext;
export { AtuhContextProvider }