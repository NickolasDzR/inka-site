import lozad from 'lozad'
// import Sticky from "sticky-js"


const imagesDesktop = document.querySelectorAll('.solution__img-fixed'),
    solutionItem = document.querySelectorAll('.solution__item'),
    imagesMobile = document.querySelectorAll('.solution__img.lozad'),
    observer = lozad(imagesMobile);

const matchMdMedia = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
        return false;
        // more than 768
    } else {
        return true;
        // less than 768
    }
}

const scrollSide = () => {
    const newScrollPosition = window.scrollY;
    const scrollPosition = newScrollPosition > oldScrollPosition ? true : false

    oldScrollPosition = newScrollPosition

    return scrollPosition;
}

const solutionSection = document.querySelector(".solution"),
    solutionItems = document.querySelectorAll(".solution__item"),
    solutionItemsWrp = document.querySelectorAll(".solution__item-wrp"),
    solutionItemHeight = solutionItemsWrp[0].offsetHeight,
    solutionFixed = document.querySelector(".solution__fixed-items");

const solutionItemsWrpPosition = solutionItemsWrp[0].offsetTop,
    solutionItemsWrpOffsetTop = [],
    coordinatsFixedTopFirstElement = solutionItems[0].offsetTop,
    coordinatsFixedTopLastElement = solutionItems[solutionItems.length - 1].offsetTop;

solutionItemsWrp.forEach(el => {
    solutionItemsWrpOffsetTop.push(el.offsetTop);
});

let imageCoordination = imagesDesktop[0].getBoundingClientRect().left;

const scrolledImgHandler = (scrollDir) => {
    const scrolledFromTop = window.scrollY;
    const solutionOffsetTop = solutionSection.offsetTop;
    const wh = window.innerHeight;
    const centerWindow = Math.round(scrolledFromTop + (wh / 2));
    const bodyRect = Math.abs(document.body.getBoundingClientRect().top);
    const lastElementPositionCenter = solutionItemsWrp[solutionItemsWrp.length - 1].getBoundingClientRect().top + (solutionItemsWrp[solutionItemsWrp.length - 1].offsetHeight / 2);
    const bottomPosition = (bodyRect - lastElementPositionCenter) - (bodyRect - (window.innerHeight / 2)) >= 0;
    const topPosition = (solutionOffsetTop + solutionItemsWrpOffsetTop[0]) - centerWindow >= `-${solutionItemsWrp[0].offsetHeight / 2}`;

    if ((solutionOffsetTop + solutionItemsWrpOffsetTop[0]) - centerWindow < -150 && !topPosition && !bottomPosition) {

        solutionFixed.style.cssText = `position: fixed;
                                                transform: translate3d(0, 18.5%, 0px);`;
    } else if (topPosition) {
        solutionFixed.style.cssText = ``;
    } else if (bottomPosition) {
        solutionFixed.style.cssText = ``;
    }

    solutionItemsWrp.forEach((el, index) => {
        const centerWindow = (bodyRect - (window.innerHeight / 2));
        const currentElementInCenter = (bodyRect - Math.abs(el.getBoundingClientRect().top) - (el.offsetHeight / 2));

        if (Math.round(bodyRect - (window.innerHeight / 2) - currentElementInCenter) > 280 && Math.round(bodyRect - (window.innerHeight / 2) - currentElementInCenter) < 320 && !scrollDir) {
            // scroll top direction
            if (index === 2 && currentElementInCenter > 4000) {
                return false;
            } else {
                if (index !== 0) {
                    imagesDesktop[index].classList.remove("solution__img-fixed_show");
                    imagesDesktop[index - 1].classList.add("solution__img-fixed_show");
                }
            }
        } else if (Math.round(bodyRect - (window.innerHeight / 2) - currentElementInCenter) < -230 && !Math.round(bodyRect - (window.innerHeight / 2) - currentElementInCenter) > -260 && scrollDir && index !== 3) {
            // scroll bottom direction
            if (index !== imagesDesktop.length - 1) {
                imagesDesktop[index].classList.remove("solution__img-fixed_show");
                imagesDesktop[index + 1].classList.add("solution__img-fixed_show");
            }
        }

        if (Math.round(bodyRect - (window.innerHeight / 2) - currentElementInCenter) <= 70 && index === 3 && !imagesDesktop[imagesDesktop.length - 1].classList.contains("solution__img-fixed_show")) {
            imagesDesktop[index].classList.add("solution__img-fixed_show");
            imagesDesktop[index - 1].classList.remove("solution__img-fixed_show");
            if (imagesDesktop[0].classList.contains("solution__img-fixed_show")) {
                imagesDesktop[0].classList.remove("solution__img-fixed_show")
            }
        } else if (Math.round(bodyRect - (window.innerHeight / 2) - currentElementInCenter) <= 0 && index === 3) {
            imagesDesktop[index].style.top = `auto`;
            imagesDesktop[index].style.bottom = `170px`;
        } else if (Math.round(bodyRect - (window.innerHeight / 2) - currentElementInCenter) > 0 && index === 3) {
            imagesDesktop[index].style.top = `0`;
            imagesDesktop[index].style.bottom = `auto`;
        }
    });
}

window.onscroll = function (e) {

    const scrollDir = this.oldScroll < this.scrollY
    this.oldScroll = this.scrollY;

    if (!matchMdMedia()) {
        scrolledImgHandler(scrollDir);

        imagesMobile.forEach(el => {
            if (el.classList.contains("lozad")) {
                el.style.display = "none";
            }
        })
    }
}

window.addEventListener("resize", function () {
    if (!matchMdMedia()) {
        imagesMobile.forEach(el => {
            if (el.classList.contains("lozad")) {
                el.style.display = "none";
            }
        })
        imagesDesktop.forEach(el => {
            el.style.display = "block";
        });
    } else {
        imagesMobile.forEach(el => {
            if (el.classList.contains("lozad")) {
                el.style.display = "block";
            }
        })
        observer.observe();
        imagesDesktop.forEach(el => {
            el.style.display = "none";
        });
    }
});

if (matchMdMedia()) {
    imagesDesktop.forEach(el => {
        el.style.display = "none";
    });
    observer.observe();
} else {
    imagesMobile.forEach(el => {
        if (el.classList.contains("lozad")) {
            el.style.display = "none";
        }
    })
    scrolledImgHandler();
}
