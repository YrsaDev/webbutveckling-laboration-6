"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Jeanette Räisänen
 */
// Hämtar sökformuläret
const search = document.querySelector("#search");
const searchform = document.querySelector("#searchform");
// Lyssnar när formuläret skickas
searchform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchValue = search.value;
    if (searchValue.trim() === "") {
        alert("Skriv in ett sökord");
    }
// Hämtar recept från API:et    
    try {
        const url = `https://dummyjson.com/recipes/search?q=${searchValue}`;
        const response = await fetch(url);
        const data = await response.json();
        if (!data.recipes.length) {
        }
        const recipe = data.recipes[0];
        console.log(recipe);
        const recipeDiv = document.createElement("div");
        recipeDiv.id = "recipe";
        const oldRecipe = document.querySelector("#recipe");
        if (oldRecipe) {
            oldRecipe.remove();
        }
// Skapar element för att visa receptet
        recipeDiv.textContent = recipe.name;
        document.body.appendChild(recipeDiv);
        const ingredientsTitle = document.createElement("h2");
        ingredientsTitle.textContent = "Ingredienser";
        recipeDiv.appendChild(ingredientsTitle);

        const ul = document.createElement("ul");
        recipe.ingredients.forEach((ingredient) => {
            const li = document.createElement("li");
            li.textContent = ingredient;
            ul.appendChild(li);
        });
        recipeDiv.appendChild(ul);
    }
// Hanterar fel vid hämtning av recept
    catch (error) {
        console.error = (error);
        alert("Fel vid hämtning av recept");
    }
});