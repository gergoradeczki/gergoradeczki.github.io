window.onscroll = function() { changeHeader() };

var header = document.querySelector("header");
var main = document.querySelector("main");

var sticky = header.offsetTop;

function changeHeader() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        main.style.marginTop = "70px";
    } else {
        header.classList.remove("sticky");
        main.style.marginTop = "20px";
    }
}