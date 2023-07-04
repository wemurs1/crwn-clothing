import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, DocumentData } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBA-0n8sZfVG2V3aqiEAD4wRhVgGjKu_v0",
    authDomain: "crwn-clothing-db-82342.firebaseapp.com",
    projectId: "crwn-clothing-db-82342",
    storageBucket: "crwn-clothing-db-82342.appspot.com",
    messagingSenderId: "7504186332",
    appId: "1:7504186332:web:c4504c1e1c32c6255d5d19"
};

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey: string, objectsToAdd: any[], field = 'title') => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object[field].toLowerCase())
        batch.set(docRef, object)
    })
    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments = async (category: string): Promise<DocumentData[]> => {
    const collectionRef = collection(db, category);
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
        } catch (error: any) {
            console.log('error creating user', error.message);

        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback)