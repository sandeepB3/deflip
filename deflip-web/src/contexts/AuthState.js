import { AuthContext } from "./AuthContext";
import React, { useState } from "react";

const AuthState = (props) => {

    const user = {
        isLoggedIn: false,
        supplier: {},
        statistics:{},
        products: [],
        topCustomers: [],
        Authorization: '',
    }

    const [state, setState] = useState(user)
    
    return (
        <AuthContext.Provider value = { {state, setState} }>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;