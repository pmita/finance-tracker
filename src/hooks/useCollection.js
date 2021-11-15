import { useState, useEffect } from 'react';
// FIREBASE
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection) => {
    //STATE
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    // useEFFECT
    useEffect(() => {
        //Real-time listening to our firestore
        let ref = projectFirestore.collection(collection);
        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => results.push({...doc.data(), id : doc.id}))
            //update state
            setDocuments(results);
            setError(null);
        }, (error) => {
            console.log(error);
            setError('Could not fetch the data');
        })

        // cleanup function
        return () => unsubscribe();

    }, [collection]);


    return { documents, error };
}