import React, { createContext, useEffect, useState } from "react";
import { ApiUser } from '../Utils/axiosInstance'
const UserContext = createContext()

const UserContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        GetCurrentUser()
    }, [])

    const GetCurrentUser = async () => {
        await ApiUser.get('/current-login')
            .then(res => {
                if (res.status == 200) {
                    setCurrentUser(res.data)
                }
            }).catch(err => {
                if (err.response !== undefined) {
                    console.log(err.response.data.message)
                }
            })
    }

    return (
        <UserContext.Provider value={{ currentUser, GetCurrentUser }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;
export { UserContextProvider }