import lozad from "lozad";

const imagesMobile = document.querySelectorAll(".solution__img.lozad"),
    observer = lozad(imagesMobile);

const solutionItemsWrp = document.querySelectorAll(".solution__item-wrp"),
    solutionItemsWrpOffsetTop = [];

solutionItemsWrp.forEach(el => {
    solutionItemsWrpOffsetTop.push(el.offsetTop);
});

window.addEventListener("resize", function () {

});

const getCoords = (elem) => { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {top: Math.round(top), left: Math.round(left)};
};

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({overwrite: "auto"});

const contentMarkers = gsap.utils.toArray(".solution__img-fixed");
const contentMarkserBlock = gsap.utils.toArray(".solution__item");

gsap.set(".solution__fixed-items > *", {xPercent: -50});

const getCoordinateOfElement = (item) => {
    const centerW = (window.innerHeight / 2) - (item.offsetHeight / 2);
    return centerW;
};

const animationFixes = ScrollTrigger.create({
    trigger: ".solution__content",
    start: `top+=40 top+=${getCoordinateOfElement(contentMarkers[0])}`,
    end: `bottom+=55 bottom-=${getCoordinateOfElement(contentMarkers[0])}`,
    onUpdate: getCurrentSection,
    pin: ".solution__fixed",
});

const solutionScrollTrigger = ScrollTrigger.create({
    trigger: ".solution",
    start: "top bottom",
    end: "bottom top",
    onEnter: () => {
        gsap.set(contentMarkers[0], {autoAlpha: 1});
    },
    onEnterBack: () => {
        gsap.set(contentMarkers[contentMarkers.length - 1], {autoAlpha: 1});
    },
});

contentMarkserBlock.forEach((marker, index) => {
    marker.content = contentMarkers[index];

    gsap.set(marker.content, {autoAlpha: 0});

    marker.content.enter = function () {
        gsap.fromTo(marker.content, {autoAlpha: 0}, {duration: 0.3, autoAlpha: 1});
    };

    marker.content.leave = function () {
        gsap.to(marker.content, {duration: 0.1, autoAlpha: 0});
    };

});

let lastContent;
let inited = false;

function getCurrentSection() {
    let newContent;
    const currScroll = scrollY + (window.innerHeight / 2);

    // Find the current section
    contentMarkserBlock.forEach(marker => {

        // const elemHeight = marker.content.offsetHeight;
        if (currScroll > getCoords(marker).top) {
            newContent = marker.content;
        }
    });

    // If the current section is different than that last, animate in
    if (newContent && (lastContent == null || !newContent.isSameNode(lastContent))) {
        // Fade out last section
        if (lastContent) {
            lastContent.leave();
        }
        // Animate in new section
        if (inited) {
            newContent.enter();
        }

        inited = true;

        lastContent = newContent;
    }

}

const media = window.matchMedia("screen and (max-width: 768px)");
ScrollTrigger.addEventListener("refreshInit", checkSTState);
checkSTState();

function checkSTState() {
    if (media.matches) {
        animationFixes.disable();
        observer.observe();
    } else {
        animationFixes.enable();
    }
}
