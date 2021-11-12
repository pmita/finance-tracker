import { useState } from 'reac';
//FIREBASE
import { projectAuth } from '../firebase/config';
// CONTEXT
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    // STATE
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
            setIsPending(false);
            setError(null);
        } catch(err){
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    }
    return { logout, error, isPending };
}