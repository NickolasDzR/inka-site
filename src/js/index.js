import "./import/modules";

import lozad from 'lozad'

const titleImg = document.querySelectorAll(".lozad");

const observerTitle = lozad(titleImg);
observerTitle.observe();

import "./import/components";
