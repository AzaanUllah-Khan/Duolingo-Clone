import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

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

function createUser() {
    dataSent = false
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var name = document.getElementById("name").value
    var age = document.getElementById("age").value
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    var month = months[new Date().getMonth()]
    var year = new Date().getFullYear()
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            await setDoc(doc(db, "Users", user.uid), {
                name,
                language: localStorage.getItem("language"),
                age,
                month,
                year
            }).then(() => {
                dataSent = true
                Toast.fire({
                    icon: 'success',
                    text: 'User created successfully'
                  }).then(()=>{
                      location.replace("../main/index.html")
                    })
            })
        })
        .catch((error) => {
            const errorMessage = error.message;
			if (errorMessage === "Firebase: Error (auth/invalid-email).") {
                Toast.fire({
                    icon: 'error',
                    title: "Invalid Email"
                })
			}
			else if (errorMessage === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                Toast.fire({
                    icon: 'error',
                    text: 'Password Should Be atleast 6 characters'
                })
			}
			else if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
                Toast.fire({
                    icon: 'error',
                    text: 'Email is already taken'
                })
			}
			else {
				console.log(errorMessage);
			}
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