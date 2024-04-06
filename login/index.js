function storeLanguage(box){
    var language = box.childNodes[2].nextElementSibling.innerText
    var svg = box.firstElementChild.viewBox.baseVal
    var svgY = svg.y
    localStorage.setItem("language",language)
    localStorage.setItem("imgY",svgY)
    setTimeout(() => {
        location.href = "./register.html"
    }, 100);
}