import lozad from 'lozad'

const matchMdMedia = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
        return false;
        // more than 768
    } else {
        return true;
        // less than 768
    }
}

const imagesMobile = document.querySelectorAll('.solution__img.lozad');
const imagesDesktop = document.querySelectorAll('.solution__img-fixed');

const observer = lozad(imagesMobile);

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

const scrolledImgHandler = () => {
    const scrolledFromTop = window.scrollY;
    const solutionOffsetTop = solutionSection.offsetTop;
    const wh = window.innerHeight;
    const centerWindow = Math.round(scrolledFromTop + (wh / 2))

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
}

document.addEventListener("scroll", function () {
    if (!matchMdMedia()) {
        scrolledImgHandler();

        imagesMobile.forEach(el => {
            if (el.classList.contains("lozad")) {
                el.style.display = "none";
            }
        })
    }
});

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
