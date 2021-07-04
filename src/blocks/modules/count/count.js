const count = document.querySelector(".count"),
    countItems = count.querySelectorAll(".count__item");

const animateValue = (elem, start) => {
    const duration = parseInt(elem.dataset.counterSpeed);
    const end = parseInt(elem.dataset.counterNum);

    if (start === end) return;
    const range = end - start;
    let current = start;
    const increment = end < start ? 1 : +1;
    const stepTime = Math.abs(duration / range) * 1000;
    const itemText = elem.querySelector(".count__number span");
    const timer = setInterval(function () {
        current += increment;
        itemText.innerHTML = current;
        if (current == end && duration) {
            clearInterval(timer);
            if (countItemsIndex < countItems.length - 1) {


                countItemsIndex += 1;
                animateValue(countItems[countItemsIndex], countItemsIndex);
            }
        }
    }, stepTime);
};

let countItemsIndex = 0;

const isObserved = (entry) => {
    if (entry[0].intersectionRatio > 0) {
        animateValue(countItems[0], countItemsIndex);
        observer.unobserve(count);
    }
};

const observer = new IntersectionObserver(isObserved);
observer.observe(count);
