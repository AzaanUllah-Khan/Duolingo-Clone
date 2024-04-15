var option = document.getElementsByTagName("p")
for (i = 0; i < option.length; i++) {
    option[i].addEventListener("click", (event) => { buttonClick(event.target) })
}
function buttonClick(btn) {
    for (i = 0; i < option.length; i++) {
        option[i].classList.remove("active")
    }
    var btnTxt = btn.innerHTML
    btn.classList.add("active")
    document.getElementById("checkBtn").disabled = false
}