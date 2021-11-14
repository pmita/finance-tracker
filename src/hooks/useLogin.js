import { useState, useEffect } from 'react';
//FIREBASE
import { projectAuth } from '../firebase/config';
// CONTEXT
import { useAuthContext } from './useAuthContext';

export const useLogin = (email, password) => {
    // STATE
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    // FUCTNION
    const login = async () => {
        setError(null);
        setIsPending(true);

        // sign user in
        try{
            const res = await projectAuth.signInWithEmailAndPassword(email ,password); //this returns a response object, and this contains the user

            // dispatch the login action after signing out
            dispatch({ type : 'LOGIN' , payload : res.user});

            // reset state
            if(!isCancelled){
                //after component unmounts we don't allow for component to update state
                setIsPending(false);
                setError(null);
            }
        } catch(err){
            console.log(err.message);
            if(!isCancelled){
                //same here
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    //We need a cleanup function to abort with the async functionality above
    useEffect(() => {
        return () => setIsCancelled(true)
    }, []);

    return { login, error, isPending };
}