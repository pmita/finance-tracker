import { useState } from 'react';
//FIREBASE
import { projectAuth } from '../firebase/config';

export const useSignup = () => {
    // STATE
    const [ error, setError ] = useState(null);
    const [isPending, setIsPending ] = useState(false);

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
            setIsPending(false);
            setError(null);
        } catch(err){
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    }   

    return { error, isPending, signup};
}