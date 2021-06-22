import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const hamburger = document.querySelector(".hamburger"),
    nav = document.querySelector(".nav"),
    html = document.querySelector("html");

hamburger.addEventListener("click", (e) => {
    e.preventDefault();
    hamburger.classList.toggle("is-active");
    nav.classList.toggle("nav_active");

    if (nav.classList.contains("nav_active")) {
        disableBodyScroll(html);
    } else {
        enableBodyScroll(html);
    }
});
