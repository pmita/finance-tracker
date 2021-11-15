import { useState, useEffect, useRef } from 'react';
// FIREBASE
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query) => {
    //STATE & VARIABLES
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    //Avoid infinte for useEffect reference type data, by using useRef
    const query = useRef(_query).current;

    // useEFFECT
    useEffect(() => {
        //Real-time listening to our firestore
        let ref = projectFirestore.collection(collection);

        if(query){
            ref = ref.where(...query)
        }

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

    }, [collection, query]);


    return { documents, error };
}