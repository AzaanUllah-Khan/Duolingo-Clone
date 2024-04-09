function switchActive(id){
    var currentActive = document.getElementsByClassName("active")
    currentActive[0].classList.remove("active")
    document.getElementById(id).classList.add("active")
}