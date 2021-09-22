import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'
import ProductAPI from './API/ProductAPI'
import UserAPI from './API/UserAPI'
export const GlobalState = createContext()

export const DataProvider = (props) => {

    const [token, setToken] = useState(false)
   
    const state = {
        token: [token, setToken],
        productAPI: ProductAPI(),
        userAPI: UserAPI(token)
    }
    useEffect(() => {

        const firstLogin =  localStorage.getItem('firstLogin')
        if(firstLogin)
        {
            const refreshToken = async () => {
                try {
                    const res = await axios.get('/users/refresh_token')
                    setToken(res.data.accesstoken)
                    setTimeout(() => {
                        refreshToken()
                    }, 10 * 60 * 1000)
                }
                catch (err) {
                    console.log(err)
                }
            }
            refreshToken()
        }
       
    },[])

    return (
        <GlobalState.Provider value={state}>
            {props.children}
        </GlobalState.Provider>
    )
}



