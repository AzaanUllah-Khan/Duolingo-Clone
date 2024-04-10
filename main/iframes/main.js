var box = document.getElementsByClassName("box");
var english;
function translate(number){
    english = (box[number].firstElementChild.innerHTML).toLocaleLowerCase();
    let apiUrl = `https://api.mymemory.translated.net/get?q=${english}&langpair=en|${localStorage.getItem("language")}`;
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        box[number].firstElementChild.nextElementSibling.innerHTML=data.responseData.translatedText
    });
}
translate(0)
translate(1)
translate(2)
translate(3)
translate(4)
translate(5)
translate(6)
translate(7)
translate(8)
translate(9)
translate(10)