
import { initializeApp } from "firebase/app";
import { getAuth,
         signInWithRedirect,
          signInWithPopup,
           GoogleAuthProvider,
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged} from 'firebase/auth'



import { 
  getFirestore,
  doc,
  getDoc,
  setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDpVQi0tERl5KvUhf9-Dj6NpUo-P3TQT-k",
  authDomain: "streetwear-clothing-148f2.firebaseapp.com",
  projectId: "streetwear-clothing-148f2",
  storageBucket: "streetwear-clothing-148f2.appspot.com",
  messagingSenderId: "704073179450",
  appId: "1:704073179450:web:ffae12d3cecf911703b003"
};


const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInwithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);
export const db = getFirestore();

export const addCollectionAnddocuments = async(collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAnddocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation ={}
  ) => {
  if(!userAuth) return;
  const userDocRef = doc(db, 'users' , userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const { Name, email } = userAuth;
    const createdAt = new Date;

    try {
      await setDoc(userDocRef, {
        Name,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user, error.message)');
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword (auth, email, password)
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword (auth, email, password)
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback);