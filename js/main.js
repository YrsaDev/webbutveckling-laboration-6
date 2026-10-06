"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Jeanette Räisänen
 */

const search = document.querySelector("#search");
const searchform = document.querySelector("#searchform");
searchform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchValue = search.value;
    if (searchValue.trim() === "") {
        alert("Skriv in ett sökord");
    }
    const url = `https://dummyjson.com/recipes/search?q=${searchValue}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.recipes.length) {
    }
    const recipe = data.recipes[0];
    console.log(recipe);
    const recipeDiv = document.createElement("div");
    recipeDiv.textContent = recipe.name;
    document.body.appendChild(recipeDiv);
    const ingredientsTitle = document.createElement("h2");
    ingredientsTitle.textContent = "Ingredienser";
    recipeDiv.appendChild(ingredientsTitle);
});