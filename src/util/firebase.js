import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCl_peLTM_TTYhOkIhagZVXw_vrvTnJ_xs",
    authDomain: "rogereducation.firebaseapp.com",
    projectId: "rogereducation",
    storageBucket: "rogereducation.appspot.com",
    messagingSenderId: "509364474253",
    appId: "1:509364474253:web:37795d280b5dedfdf32dc4",
    measurementId: "G-TPPGRE3XQH"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage,firebase as default};