import React, { createContext, useEffect, useReducer } from 'react'
// FIREBASE
import { projectAuth } from '../firebase/config';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return { ...state, user: action.payload}
        case 'LOGOUT':
            return { ...state , user : null };
        case 'AUTH_IS_READY':
            return{ ...state, user : action.payload, authIsReady : true}
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user : null,
        authIsReady: false
    });

    console.log('AuthContext state:', state);

    // useEFFECT
    useEffect(() => {
        //communicate with firebase whenever there is a change in the user authentication
        // below method still brings us back an unsubscribe function to unmount our component
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({ type : 'AUTH_IS_READY', payload : user});
            unsub()
        })
    }, []); // check if user is logged in before mounting any of the components

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}