import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
const hamburger = document.querySelector(".hamburger"),
    nav = document.querySelector(".nav"),
    navLink = nav.querySelectorAll(".nav__link"),
    html = document.querySelector("html");

const navHandler = (e) => {
    hamburger.classList.toggle("is-active");
    nav.classList.toggle("nav_active");

    if (nav.classList.contains("nav_active")) {
        disableBodyScroll(html);
    } else {
        enableBodyScroll(html);
    }
}

hamburger.addEventListener("click", (e) => {
    navHandler(e);
});
