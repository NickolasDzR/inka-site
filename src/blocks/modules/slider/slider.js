import Glide from '@glidejs/glide'

const sliderAutoplaySpeed = parseInt(document.querySelector(".slider__slides-wrp").dataset.autoplaySpeed);

const inkaSlider = new Glide('.glide', {
    autoplay: sliderAutoplaySpeed * 1000,
    type: 'carousel',
    perView: 1,
}).mount()

const sliderBtns = document.querySelectorAll(".slider__slider-controller-btn");
    let activeSlideIndex;

sliderBtns.forEach(el => {
   el.addEventListener("click", (e) => {
       e.preventDefault();
       const item = e.currentTarget;
       const index = item.dataset.slide;

       if (activeSlideIndex) {
           sliderBtns[activeSlideIndex].classList.remove("slider__slider-controller-btn_active");
       }

       sliderBtns[index].classList.add("slider__slider-controller-btn_active");

       activeSlideIndex = index;
       inkaSlider.update({
           startAt: index,
       })
   });
});

inkaSlider.on(['move.after'], (e) => {
    const sliderBtns = document.querySelectorAll(".slider__slider-controller-btn");

    sliderBtns.forEach(el => {
       if (el.classList.contains("slider__slider-controller-btn")) {
           el.classList.remove("slider__slider-controller-btn_active");
       }
    });
    sliderBtns[inkaSlider.index].classList.add("slider__slider-controller-btn_active");
});
