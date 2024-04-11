import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCIrlFqcZrbpluUnBZ1bL6_8SsiwBmISi4",
    authDomain: "doulingo-clone.firebaseapp.com",
    projectId: "doulingo-clone",
    storageBucket: "doulingo-clone.appspot.com",
    messagingSenderId: "617420715151",
    appId: "1:617420715151:web:83f2b90e42e79a3ee8ecfa",
    measurementId: "G-WC71VL2GVL"
};

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
var email;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        email = user.email
        if (docSnap.exists()) {
            document.getElementById("name").innerHTML = docSnap.data().name
            document.getElementById("nick").innerHTML = (docSnap.data().name).split(" ")[0] + "1"
            document.getElementById("join").innerHTML = `Joined ${docSnap.data().month} ${docSnap.data().year}`
        } else {
            console.log("No such document!");
        }
    }
});

var y = localStorage.getItem("imgY")
document.getElementById("svg").viewBox.baseVal.x = "0"
document.getElementById("svg").viewBox.baseVal.y = y
document.getElementById("svg").viewBox.baseVal.width = "82"
document.getElementById("svg").viewBox.baseVal.height = "66"

document.getElementById("f").addEventListener("click", () => {
    document.getElementById("f").classList.add("active")
    document.getElementById("fi").classList.remove("active")
    document.getElementById("ma").innerHTML = `<img src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/a925a18c6be921a81bf0e13102983168.svg" alt="">
    <p>Learning is more fun and effective when you connect with others.</p>`
})
document.getElementById("fi").addEventListener("click", () => {
    document.getElementById("fi").classList.add("active")
    document.getElementById("f").classList.remove("active")
    document.getElementById("ma").innerHTML = `<h1>No Followers Yet</h1>`
})
function uploadPics() {
    const storageRef = ref(storage, email);
    const file = document.getElementById("file").files[0]

    uploadBytes(storageRef, file).then(() => {
        console.log('Uploaded a blob or file!');
    }).then(()=>{
        Toast.fire({
            icon: 'success',
            text: 'Avatar Updated Successfully'
          }).then(()=>{
                window.top.location.reload();
            })
    })
}
document.getElementById("file").addEventListener("change",uploadPics)