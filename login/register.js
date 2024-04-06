import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

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
const db = getFirestore(app);
var dataSent = true

function createUser() {
    dataSent = false
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var name = document.getElementById("name").value
    var age = document.getElementById("age").value
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            await setDoc(doc(db, "Users", user.uid), {
                name,
                language: localStorage.getItem("language"),
                age,
            }).then(() => {
                dataSent = true
                location.replace("../main/index.html")
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
var signupBtn = document.getElementById("signup")
signupBtn.addEventListener("click", createUser)
onAuthStateChanged(auth, (user) => {
    if (user) {
        if(dataSent){
            location.replace("../main/index.html")
        }
    }
});