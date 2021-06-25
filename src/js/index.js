import "./import/modules";
import "./import/components";

import lozad from 'lozad'

const titleImg = document.querySelectorAll(".lozad");
const observerTitle = lozad(titleImg);
observerTitle.observe();

const appStoreLink = document.querySelectorAll(".qr-code");
const qrImg = document.querySelector(".qr-code-image");
const arImgTriangle = document.querySelector(".qr-code-image__triangle");

appStoreLink.forEach((el) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();

        const el = e.currentTarget;
        const elCoordinates = offsetOfQrCode(el);

        console.log(elCoordinates);

        qrImg.style.cssText = `top: ${elCoordinates.top + 20}px; left: ${elCoordinates.left}px`;
        if (qrImg.classList.contains("qr-code-image_active")) {
            setTimeout(() => {
                arImgTriangle.style.transform = null;
                arImgTriangle.style.left = null;
                arImgTriangle.style.right = null;
            }, 300)
        }
        if (qrImg.getBoundingClientRect().left < 0) {
            const left = Math.abs(qrImg.getBoundingClientRect().left);
            qrImg.style.left = `${parseInt(qrImg.style.left) + (left + 5)}px`;

            arImgTriangle.style.left = `${el.getBBox().width}px`;
            arImgTriangle.style.right = `auto`;
            arImgTriangle.style.transform = 'none'
        }
        if (qrImg.getBoundingClientRect().right - window.innerWidth > 0) {
            const right = qrImg.getBoundingClientRect().right - window.innerWidth;
            qrImg.style.left = `${parseInt(qrImg.style.left) - (right + 5)}px`;
            arImgTriangle.style.right = `${el.getBBox().width}px`;
            arImgTriangle.style.left = `auto`;
            arImgTriangle.style.transform = 'none'
        }

        qrImg.classList.toggle("qr-code-image_active");

    });
})

const offsetOfQrCode = (el) => {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop,
        centerWidth = el.getBBox().height,
        centerHeight = el.getBBox().width / 2;

    return {top: rect.top + scrollTop + centerWidth, left: rect.left + scrollLeft + centerHeight}
}
