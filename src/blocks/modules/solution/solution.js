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

// const isObserved = (entry) => {
//     if (entry[0].intersectionRatio > 0) {
//
//         console.log(entry[0].intersectionRatio)
//
//         solutionFixed.style.cssText = "position: fixed; top: 40%;"
//         const index = parseInt(entry[0].target.closest(".solution__item").dataset.index);
//         imagesDesktop[index].classList.add("solution__img-fixed_show");
//
//         imagesDesktop.forEach((el, i) => {
//             if (el.classList.contains("solution__img-fixed_show") && index !== i) {
//                 el.classList.remove("solution__img-fixed_show");
//             }
//         });
//     }
// }
//
// solutionItemsWrp.forEach((el, index) => {
//
//     function observeFunc() {
//         const wh = window.innerHeight;
//         const rootMarginSettings = `${ Math.round(parseInt(window.innerHeight) / 2)}`;
//         let settings;
//
//         settings = {
//             rootMargin: `-130px 0px -130px 0px`,
//             threshold: 0,
//         }
//
//         console.log(settings, index);
//
//         const observer = new IntersectionObserver(isObserved, settings);
//         observer.observe(el)
//     }
//
//     observeFunc();
// })

const solutionItemsWrpPosition = solutionItemsWrp[0].offsetTop,
    solutionItemsWrpOffsetTop = [],
    coordinatsFixedTopFirstElement = solutionItems[0].offsetTop;
coordinatsFixedTopLastElement = solutionItems[solutionItems.length - 1].offsetTop,
    imageCoordination = imagesDesktop[0].getBoundingClientRect().left;

console.log(imageCoordination);

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


    if ((solutionOffsetTop + solutionItemsWrpOffsetTop[0]) - centerWindow > 0) {
        solutionFixed.style.cssText = "top: 0; bottom: auto;"
    } else if ((solutionOffsetTop + solutionItemsWrpOffsetTop[solutionItemsWrpOffsetTop.length - 1]) - centerWindow < -(solutionItemHeight - 60)) {
        imagesDesktop[imagesDesktop.length - 1].style.cssText = "bottom: 0; top: auto;";
        solutionFixed.style.cssText = ""
    } else {
        solutionItemsWrpOffsetTop.forEach((el, index) => {
            if ((solutionOffsetTop + solutionItemsWrpOffsetTop[index]) - centerWindow < 100) {
                solutionFixed.style.cssText = `position: fixed; 
                                                transform: translate3d(${imageCoordination}px, 37.5%, 0px);`
                deleteImageClass(index);
                imagesDesktop[index].classList.add("solution__img-fixed_show");
                imagesDesktop[imagesDesktop.length - 1].style.cssText = "";
            }
        });
    }
})
