document.getElementById("lang").innerHTML = localStorage.getItem("language")
var q = 0
var questionsAnswers = [
    {
        question:"Monday",
        option1:"Friday",
        option2:"Monday",
        option3:"Tuesday",
        option4:"Thursday",
        correctOpt:"2"
    },{
        question:"How are you ?",
        option1:"Hello",
        option2:"What time is it ?",
        option3:"How are you ?",
        option4:"What is you name ?",
        correctOpt:"3"
    },{
        question:"Father",
        option1:"Mother",
        option2:"Uncle",
        option3:"Son",
        option4:"Father",
        correctOpt:"4"
    },{
        question:"Good Night",
        option1:"Good Morning",
        option2:"I am fine",
        option3:"Hello",
        option4:"Good Night",
        correctOpt:""
    },{
        question:"I am a Boy",
        option1:"I am a Boy",
        option2:"I am a Girl",
        option3:"My name is",
        option4:"What is your name ?",
        correctOpt:"1"
    }
]
function setQ(){
    document.getElementById("checkBtn").disabled = true
    document.getElementById("question").innerHTML = questionsAnswers[q].question
    for (i = 0; i < option.length; i++) {
        option[i].classList.remove("active")
    }
}
var option = document.getElementsByTagName("p")
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
document.getElementById("checkBtn").addEventListener("click",increaseQ)
function increaseQ(){
    q++
    setQ()
}
setQ()