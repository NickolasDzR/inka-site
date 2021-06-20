// import lozad from 'lozad'
//
// import Lozad from 'lozad';

const imagesMobile = document.querySelectorAll('.solution__img');
const imagesDesktop = document.querySelectorAll('.solution__img-fixed');
//
// if (window.matchMedia("(max-width: 768px)").matches) {
//     const observer = lozad(imagesMobile);
//     observer.observe();
// }

const solutionSection = document.querySelector(".solution"),
    solutionItems = document.querySelectorAll(".solution__item"),
    solutionItemsWrp = document.querySelectorAll(".solution__item-wrp"),
    solutionItemHeight = solutionItemsWrp[0].offsetHeight,
    solutionFixed = document.querySelector(".solution__fixed-items");

const solutionItemsWrpPosition = solutionItemsWrp[0].offsetTop,
    solutionItemsWrpOffsetTop = [],
    coordinatsFixedTopFirstElement = solutionItems[0].offsetTop,
    coordinatsFixedTopLastElement = solutionItems[solutionItems.length - 1].offsetTop;

let imageCoordination = imagesDesktop[0].getBoundingClientRect().left;

solutionItemsWrp.forEach(el => {
    solutionItemsWrpOffsetTop.push(el.offsetTop);
});

const deleteImageClass = (i) => {
    return imagesDesktop.forEach((el, index) => {
        if (index !== i && el.classList.contains("solution__img-fixed_show")) {
            el.classList.remove("solution__img-fixed_show");
        }
    });
}

document.addEventListener("scroll", () => {
    const scrolledFromTop = window.scrollY;
    const solutionOffsetTop = solutionSection.offsetTop;
    const wh = window.innerHeight;
    const centerWindow = Math.round(scrolledFromTop + (wh / 2))

        console.log((solutionOffsetTop + solutionItemsWrpOffsetTop[0]) - centerWindow);
    if ((solutionOffsetTop + solutionItemsWrpOffsetTop[0]) - centerWindow > -121) {
        solutionFixed.style.cssText = "top: 0; bottom: auto;"
    } else if ((solutionOffsetTop + solutionItemsWrpOffsetTop[solutionItemsWrpOffsetTop.length - 1]) - centerWindow < -(solutionItemHeight - 60)) {
        imagesDesktop[imagesDesktop.length - 1].style.cssText = "bottom: 0; top: auto;";
        solutionFixed.style.cssText = ""
    } else {
        solutionItemsWrpOffsetTop.forEach((el, index) => {
            if ((solutionOffsetTop + solutionItemsWrpOffsetTop[index]) - centerWindow < -100) {
                solutionFixed.style.cssText = `position: fixed; 
                                                transform: translate3d(${imageCoordination}px, 37.5%, 0px);`
                deleteImageClass(index);
                imagesDesktop[index].classList.add("solution__img-fixed_show");
                imagesDesktop[imagesDesktop.length - 1].style.cssText = "";
            }
        });
    }
})
