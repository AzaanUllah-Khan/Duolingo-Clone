document.getElementById("lang").innerHTML = localStorage.getItem("language")
localStorage.setItem("lifelines", 3)
var q = 0
var questionsAnswers = [
    {
        question: "Monday",
        option1: "Friday",
        option2: "Monday",
        option3: "Tuesday",
        option4: "thursday",
        correctOpt: "2"
    }, {
        question: "How are you ?",
        option1: "Hello",
        option2: "What time is it ?",
        option3: "How are you ?",
        option4: "What is your name ?",
        correctOpt: "3"
    }, {
        question: "Father",
        option1: "Mother",
        option2: "Uncle",
        option3: "Son",
        option4: "Father",
        correctOpt: "4"
    }, {
        question: "Good Night",
        option1: "Good Morning",
        option2: "I am fine",
        option3: "Hello",
        option4: "Good Night",
        correctOpt: "4"
    }, {
        question: "I am a Boy",
        option1: "I am a Boy",
        option2: "I am a Girl",
        option3: "My name is",
        option4: "What is your name ?",
        correctOpt: "1"
    }
]
var option = document.getElementsByTagName("p")
const loader = document.querySelector('.top .loader');

function setQ() {
        loader.style.setProperty('--width', `${q / 5 * 100}%`);
        const afterWidth = parseFloat(getComputedStyle(loader).getPropertyValue('--width'));
        loader.style.setProperty('--before-width', `${afterWidth - 1}%`);
        document.getElementById("res").style.display = "none"
        document.getElementById("ll").innerHTML = localStorage.getItem("lifelines");
        document.getElementById("checkBtn").disabled = true;
        document.getElementById("question").innerHTML = questionsAnswers[q].question;
        for (let i = 0; i < option.length; i++) {
            option[i].classList.remove("active");
            option[i].id = i + 1
            let apiUrl = `https://api.mymemory.translated.net/get?q=${questionsAnswers[q][`option${i + 1}`]}&langpair=en|${localStorage.getItem("language")}`;
            fetch(apiUrl)
                .then(res => res.json())
                .then(data => {
                    option[i].innerHTML = data.responseData.translatedText
                });
        }
}


for (i = 0; i < option.length; i++) {
    option[i].addEventListener("click", (event) => { buttonClick(event.target) })
}
function buttonClick(btn) {
    for (i = 0; i < option.length; i++) {
        option[i].classList.remove("active")
    }
    btn.classList.add("active")
    document.getElementById("checkBtn").disabled = false
}
function check() {
    document.getElementById("res").style.display = "flex"
    var btn = document.getElementsByClassName("active")[0]
    if (btn.id == questionsAnswers[q].correctOpt) {
        document.getElementById("res").className = "result correct"
        document.getElementById("status").className = "fa fa-check"
        document.getElementById("ans").innerHTML = document.getElementById("ans").innerHTML = questionsAnswers[q]["option" + questionsAnswers[q].correctOpt];
        document.getElementById("ans").previousElementSibling.innerHTML = "Nicely Done. Meaning:"
        addPopEffect("status");
        new Audio('../assets/Sound/Voicy_Correct answer sound effect .mp3').play()
    } else {
        document.getElementById("res").className = "result wrong"
        document.getElementById("status").className = "fa fa-close"
        document.getElementById("ans").previousElementSibling.innerHTML = "Wrong Answer. Correct Solution:"
        document.getElementById("ans").innerHTML = document.getElementById("ans").innerHTML = questionsAnswers[q]["option" + questionsAnswers[q].correctOpt] + " " + "( Option" + questionsAnswers[q].correctOpt + " )";
        addPopEffect("status");
        new Audio('../assets/Sound/Voicy_Bad answer.mp3').play()
    }
}
function increaseQ() {
    q++
    if(q >= questionsAnswers.length){
        document.getElementById("increaseQ").innerHTML = ""
        loader.style.setProperty('--width', `${q / 5 * 100}%`);
        const afterWidth = parseFloat(getComputedStyle(loader).getPropertyValue('--width'));
        loader.style.setProperty('--before-width', `${afterWidth - 1}%`);
        document.getElementById("increaseQ").classList.add("loaddd")
        document.getElementById("increaseQ").disabled = true
        setTimeout(() => {
            window.location.replace("./result.html")
        }, 3500);
    }else{
        setQ()
    }
}
document.getElementById("increaseQ").addEventListener("click", increaseQ)
document.getElementById("checkBtn").addEventListener("click", check)
document.getElementById("skip").addEventListener("click", skip)
function skip() {
    ll = Number(localStorage.getItem("lifelines"))
    if (ll >= 2) {
        q++
        localStorage.setItem("lifelines", ll - 1)
        setQ()
    }
}
setQ()
function addPopEffect(element) {
    document.getElementById(element).classList.add('pop');
    setTimeout(() => {
        document.getElementById(element).classList.remove('pop');
    }, 300);
}