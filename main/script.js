function switchActive(id) {
    var screenWidth = window.innerWidth;
    if (screenWidth <= 800) {
        document.getElementById('main').style.zIndex = '1';
        document.getElementById('aside').style.zIndex = '0';
    }
    var currentActive = document.getElementsByClassName("active");
    currentActive[0]?.classList.remove("active");
    document.getElementById(id)?.classList.add("active");
    setTimeout(() => {
        document.getElementById("iframe").src = `./iframes/${id}.html`;
        document.getElementById("main")?.classList.add("animate");
    }, 1000);
    setTimeout(() => {
        document.getElementById("main")?.classList.remove("animate");
    }, 1000);
}
