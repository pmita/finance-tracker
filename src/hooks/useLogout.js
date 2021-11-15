import { useState, useEffect } from 'react';
//FIREBASE
import { projectAuth } from '../firebase/config';
// CONTEXT
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    // STATE
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    // FUCTNION
    const logout = async () => {
        setError(null);
        setIsPending(true);

        // sign user out
        try{
            await projectAuth.signOut(); 

            // dispatch the logout action after signing out
            dispatch({ type : 'LOUGOUT' });

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

    return { logout, error, isPending };
}