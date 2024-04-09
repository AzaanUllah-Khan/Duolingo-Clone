function switchActive(id) {
    document.getElementById("main")?.classList.add("animate")
    var currentActive = document.getElementsByClassName("active")
    currentActive[0]?.classList.remove("active")
    document.getElementById(id)?.classList.add("active")
    setTimeout(() => {
        document.getElementById("iframe").src = `./iframes/${id}.html`
    }, 1000);
    setTimeout(() => {
        document.getElementById("main")?.classList.remove("animate")
    }, 1000)
}