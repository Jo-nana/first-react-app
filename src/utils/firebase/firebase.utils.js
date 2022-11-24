import { initializeApp } from 'firebase/app';
// importing firebase methods
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// importing firestore methods
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';
// documentations on firebase auth: https://firebase.google.com/docs/auth/web/start

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVnrtz6Z44lkodFAhW9wnY8UMcnEvrQEw",
  authDomain: "ecommerce-react-db-52208.firebaseapp.com",
  projectId: "ecommerce-react-db-52208",
  storageBucket: "ecommerce-react-db-52208.appspot.com",
  messagingSenderId: "865646512398",
  appId: "1:865646512398:web:d81821c564c1c24e80ef5f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Create a collection in the DB
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey); // get the collection reference
  const batch = writeBatch(db); // create a batch

  // loop through the objects to add
  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase()); // get the document reference
    batch.set(docRef, object); // add the object to the batch
  });

  await batch.commit(); // commit the batch
  console.log('done');
};

// Get the items collection inside the DB
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q); // fetch the documents
  const categoryMap = querySnapshot.docs.reduce((acc, dcoSnapshot) => {
    const { title, items } = dcoSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// Create a provider for Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// create database
export const db = getFirestore();

// create user profile document (inside the database)
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  // get the authID from the user
  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  // if user data already exists
  // return userDocRef;
  return userDocRef;

}

 // Create a user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return; // if email or password is empty don't proceed
  return await createUserWithEmailAndPassword(auth, email, password);
}

// Sign in a user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return; // if email or password is empty don't proceed
  return await signInWithEmailAndPassword(auth, email, password);
}

// Sign out a user
export const signOutUser = async () => await signOut(auth);

// Listen to auth state changes (sign in, sign out)
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
