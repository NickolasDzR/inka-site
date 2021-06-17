const hamburger = document.querySelector(".hamburger"),
    nav = document.querySelector(".nav"),
    navAnimationItems = nav.dataset.itemsAnimation,
    navItems = document.querySelectorAll(".nav__item");

hamburger.addEventListener("click", (e) => {
    e.preventDefault();
    hamburger.classList.toggle("is-active");
    nav.classList.toggle("nav_active");

    if (navAnimationItems === "true") {
        navItems.forEach((item, index) => {
            const baseDelay = 0.2;
            setTimeout(() => {
                item.classList.toggle("nav__item_bounceInLeft");
                item.classList.toggle(`nav__item_bounceInLeft_0${(index + 1) * 2}s`);
            }, baseDelay * (index + 1));
        });
    }
});
