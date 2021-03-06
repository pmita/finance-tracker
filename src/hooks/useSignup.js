import { useState, useEffect } from 'react';
//FIREBASE
import { projectAuth } from '../firebase/config';
// HOOKS
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    // STATE
    const [isCancelled, setIsCancelled] = useState(false);
    const [ error, setError ] = useState(null);
    const [isPending, setIsPending ] = useState(false);
    const { dispatch } = useAuthContext();

    //FUNCTIONS
    const signup = async (email, password, displayName) => {
        setError(null); // In case there are previous errors
        setIsPending(true);

        try{
            //sign up user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password) // it sends a response
            console.log(res.user); // details about user just created
            

            if(!res){
                throw new Error('Could not complete sign up');
            }

            //add display name to user
            await res.user.updateProfile({ displayName : displayName}); //after user is created, update the display name for the user
            
            //dispatch login action
            dispatch({ type : 'LOGIN', payload : res.user});
            
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

    //cleanup function
    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return { error, isPending, signup};
}