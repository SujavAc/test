import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";


var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCl_peLTM_TTYhOkIhagZVXw_vrvTnJ_xs",
    authDomain: "rogereducation.firebaseapp.com",
    projectId: "rogereducation",
    storageBucket: "rogereducation.appspot.com",
    messagingSenderId: "509364474253",
    appId: "1:509364474253:web:37795d280b5dedfdf32dc4",
    measurementId: "G-TPPGRE3XQH"
  });

  var firebaseDB = firebaseApp.database().ref();

  var firebaseStorage = firebaseApp.storage();

  var fireStore = firebaseApp.firestore();
   

  export {
    firebaseStorage, firebaseDB, fireStore, firebase as default
  }