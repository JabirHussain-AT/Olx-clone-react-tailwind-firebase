import React, { createContext, useEffect, useState } from 'react';
import {onAuthStateChanged} from 'firebase/auth'
import {db, auth} from '../firebase/config'
import {doc, getDoc} from 'firebase/firestore'

export const AuthContext = createContext(null);
export default function AuthProvider({children}){
    const [user, setUser] = useState(null)
    useEffect(() => { 
        onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser,"current user");
            console.log(user,"it is the user in the context")
            if(currentUser){
                getDoc(doc(db,"users", currentUser.uid))
                .then(()=> {
                    setUser({
                        userName: currentUser.displayName,
                        userId: currentUser.uid
                    })
                })
            }
            else {
                setUser(null)
            }
        })
    },[user?.userName])
    const setAsUser = (val) =>{
        setUser(val)
    }
    return (
        <AuthContext.Provider value={{user, name: user?.userName, userId: user?.userId, setAsUser}}>
            {children}
        </AuthContext.Provider>
    )
}