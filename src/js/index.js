import "./import/modules";

import lozad from 'lozad'

const titleImg = document.querySelectorAll(".lozad");

console.log(titleImg);

const observerTitle = lozad(titleImg);
observerTitle.observe();

import "./import/components";
