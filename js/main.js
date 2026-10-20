"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Jeanette Räisänen
 */
// Hämtar sökformuläret
const search = document.querySelector("#search");
const searchform = document.querySelector("#searchform");
async function fetchRecipes(searchValue) {
    console.log(searchValue);
// Hämtar recept från API:et    
    try {
        const url = `https://dummyjson.com/recipes/search?q=${searchValue}`;
        const response = await fetch(url);
        const data = await response.json();
        if (!data.recipes.length) {
        alert("Inget recept hittades");
        return;
        }
        const recipe = data.recipes[0];
        console.log(recipe);
        const recipeDiv = document.querySelector("#recipe");
        recipeDiv.innerHTML = "";
// Skapar element för att visa receptet
        const recipeTitle = document.createElement("h3");
        recipeTitle.textContent = recipe.name;
        recipeDiv.appendChild(recipeTitle);
        const recipeImage = document.createElement("img");
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.name;
        recipeDiv.appendChild(recipeImage);
        const recipeInfo = document.createElement("div");
        recipeInfo.className = "recipe-info";
        recipeInfo.innerHTML = `<p><strong>Förberedningstid:</strong> ${recipe.prepTimeMinutes} minuter</p>
                                <p><strong>Tillagningstid:</strong> ${recipe.cookTimeMinutes} minuter</p>
                                <p><strong>Antal portioner:</strong> ${recipe.servings}</p>
                                <p><strong>Svårighetsgrad:</strong> ${recipe.difficulty}</p>`;
                                
        recipeDiv.appendChild(recipeInfo);
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
    }
// Lyssnar när formuläret skickas
searchform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchValue = search.value;
    if (searchValue.trim() === "") {
        alert("Skriv in ett sökord");
        return;
    }
    await fetchRecipes(searchValue);
});