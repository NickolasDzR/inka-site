const count = document.querySelector(".count"),
    countItems = count.querySelectorAll(".count__item");

const animateValue = (elem, start, end, duration) => {
    if (start === end) return;
    const range = end - start;
    let current = start;
    const increment = end < start? 1 : +1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const item = elem;
    const itemText = elem.querySelector(".count__number");
    const timer = setInterval(function() {
        current += increment;
        itemText.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

countItems.forEach((elem, index) => {
    const countNum = elem.dataset.counterNum;
    const countSpeed = elem.dataset.counterSpeed;

    const isObserved = (entry) => {
        if (entry[0].intersectionRatio > 0) {
            animateValue(entry[0].target, 0, parseInt(countNum), `${parseInt(countSpeed)}000`);
            observer.unobserve(elem);
        }
    };

    const observer = new IntersectionObserver(isObserved);
    observer.observe(elem);
});
