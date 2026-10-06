"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Jeanette Räisänen
 */

const search = document.querySelector("#search");
const searchform = document.querySelector("#searchform");
searchform.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchValue = search.value;
    if (searchValue.trim() === "") {
        alert("Skriv in ett sökord");
        }
    });