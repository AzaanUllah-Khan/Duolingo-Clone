import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

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

function signUser() {
    dataSent = false
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            dataSent = true
            Toast.fire({
                icon: 'success',
                text: 'LoggedIn successfully'
            }).then(async () => {
                if (user) {
                    const docRef = doc(db, "Users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                        if (docSnap.data().language == "Japanese") {
                            localStorage.setItem("language", "Japanese")
                            localStorage.setItem("imgY", 264)
                        } else if (docSnap.data().language == "Korean") {
                            localStorage.setItem("language", "Korean")
                            localStorage.setItem("imgY", 396)
                        }
                        else if (docSnap.data().language == "Spanish") {
                            localStorage.setItem("language", "Spanish")
                            localStorage.setItem("imgY", 66)
                        }
                        else if (docSnap.data().language == "French") {
                            localStorage.setItem("language", "French")
                            localStorage.setItem("imgY", 132)
                        }
                    }
                }
            }).then(()=>{
                location.replace("../main/index.html")
            })
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            if (errorMessage === "Firebase: Error (auth/invalid-email).") {
                Toast.fire({
                    icon: 'error',
                    title: "Invalid Email"
                })
            }
            else if (errorMessage === "Firebase: Error (auth/missing-password).") {
                Toast.fire({
                    icon: 'error',
                    text: 'Password Should Be Entered'
                })
            }
            else if (errorMessage === "Firebase: Error (auth/invalid-credential).") {
                Toast.fire({
                    icon: 'error',
                    text: 'Invalid Email or Passwords'
                })
            }
        });
}
var loginBtn = document.getElementById("login")
loginBtn.addEventListener("click", signUser)
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (dataSent) {
            location.replace("../main/index.html")
        }
    }
});