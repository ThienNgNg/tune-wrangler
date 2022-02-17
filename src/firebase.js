import firebase  from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBRY7_SiPC58lv0Cr_ET67pBHU8UD5O_Kg",
  authDomain: "tune-wrangler.firebaseapp.com",
  projectId: "tune-wrangler",
  storageBucket: "tune-wrangler.appspot.com",
  messagingSenderId: "359210943677",
  appId: "1:359210943677:web:1700c473716dfe747323d4",
  measurementId: "G-DVVHKN9NP8"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

//Sign in with Google
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => { //TODO: fix n shit user stuff
    if(!user){
        return;
    }
  
    const userRef = db.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
  
    if(!snapshot.exists){
      const { email } = user;
      try{
        await userRef.set({
          email,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };

const getUserDocument = async uid => {
    if(!uid){
        return null;
    }

    try{
        const userDocument = await db.doc(`users/${uid}`).get();

        return{
            uid,
            ...userDocument.data()
        };
    }catch(error){
        console.error("Error fetching user", error);
    }
};

export const signOut = () => {
    auth.signOut();
    console.log('user signed out');
};