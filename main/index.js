import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getStorage, ref,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCIrlFqcZrbpluUnBZ1bL6_8SsiwBmISi4",
    authDomain: "doulingo-clone.firebaseapp.com",
    projectId: "doulingo-clone",
    storageBucket: "doulingo-clone.appspot.com",
    messagingSenderId: "617420715151",
    appId: "1:617420715151:web:83f2b90e42e79a3ee8ecfa",
    measurementId: "G-WC71VL2GVL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();

onAuthStateChanged(auth, (user) => {
    if (user) {
        getDownloadURL(ref(storage, user.email))
                .then((url) => {
                    document.getElementById("img").src = url
                })
    } else {
        location.replace("/")
    }
});
var y = localStorage.getItem("imgY")
document.getElementById("signout").addEventListener("click",()=>{
    signOut(auth).then(() => {
      }).catch((error) => {
      });
})
document.getElementById("svg").viewBox.baseVal.x = "0"
document.getElementById("svg").viewBox.baseVal.y = y
document.getElementById("svg").viewBox.baseVal.width = "82"
document.getElementById("svg").viewBox.baseVal.height = "66"