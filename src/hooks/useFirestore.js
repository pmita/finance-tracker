import { useReducer, useEffect, useState } from "react";
// FIREBASE
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
    document : null,
    isPending : false,
    error : null,
    success : null
}

const firestoreReducer = (state, action) => {
    switch(action.type){
        case 'IS_PENDING':
            return { isPending : true, document : null, success : false, error : null };
        case 'ADDED_DOCUMENT':
            return { isPending: false, document : action.payload, success : true, error : null };
        case 'ERROR':
            return { isPending: false, document : null, success : false, error : action.payload };
        default:
            return state;
    }
}

export const useFirestore = (collection) => {
    // STATE
    const [ response, dispatch ] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    // collection ref
    const ref = projectFirestore.collection(collection)

    // only dispatch if not canceled
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled){
            dispatch(action)
        }
    }

    // add a document
    const addDocument = async (doc) => {
        dispatch({ type : 'IS_PENDING'})

        try{
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({ ...doc, createdAt : createdAt}); //returns us a reference to the document we just added
            dispatchIfNotCancelled({ type : 'ADDED_DOCUMENT', payload : addedDocument});
        } catch(err){
            dispatchIfNotCancelled({ type : 'ERROR', payload : err.message });
        }
    }

    // delete a document
    const deleteDocument = async (id) => {

    }

    // useEFFECT
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    return { addDocument, deleteDocument, response};
}