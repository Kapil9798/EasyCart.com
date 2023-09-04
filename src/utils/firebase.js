// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from "firebase/firestore";

//Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6snSJKLlDzrQ_4yy_RTKnuXs13sDSPyU",
  authDomain: "shopping-cart-db-d9784.firebaseapp.com",
  projectId: "shopping-cart-db-d9784",
  storageBucket: "shopping-cart-db-d9784.appspot.com",
  messagingSenderId: "5330656128",
  appId: "1:5330656128:web:c7bfcb08868701da967f65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  const userRefDoc = doc(db, "users", userAuth.uid);

  const userDocSnapshot = await getDoc(userRefDoc);

  if (!userDocSnapshot.exists()) {
    const { displayName, email } = userAuth;
    let createdAt = new Date();
    try {
      setDoc(userRefDoc, { displayName, email, createdAt, ...additionalInfo });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRefDoc;
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserFromEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  console.log("Email value", email);
  if (!email || !password) return;
  console.log(email);
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callBack) =>
  onAuthStateChanged(auth, callBack);
