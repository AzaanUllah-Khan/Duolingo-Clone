function storeLanguage(box){
    var language = box.childNodes[2].nextElementSibling.innerText
    localStorage.setItem("language",language)
    setTimeout(() => {
        location.replace("./register.html")
    }, 100);
}