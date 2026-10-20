"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Jeanette Räisänen
 */
// Hämtar sökformuläret
const search = document.querySelector("#search");
const searchform = document.querySelector("#searchform");
const errorMessage = document.querySelector("#error");
const apiMessage = document.querySelector("#message");
async function fetchRecipes(searchValue) {
    console.log(searchValue);
// Hämtar recept från API:et    
    try {
        const url = `https://dummyjson.com/recipes/search?q=${searchValue}`;
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error("API-anropet misslyckades");
        }
        const data = await response.json();
        if (!data.recipes.length) {
        apiMessage.textContent = "Inget recept hittades";
        document.querySelector("#recipe").innerHTML = "";
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
        const instructionsTitle = document.createElement("h4");
        instructionsTitle.textContent = "Instruktioner";
        recipeDiv.appendChild(instructionsTitle);
        const instructionsList = document.createElement("ol");
        recipe.instructions.forEach((instruction) => {
            const li = document.createElement("li");
            li.textContent = instruction;
            instructionsList.appendChild(li);
        });
        recipeDiv.appendChild(instructionsList);
    }
// Hanterar fel vid hämtning av recept
    catch (error) {
        console.error=(error);
        apiMessage.textContent = "Fel vid hämtning av recept";
        document.querySelector("#recipe").innerHTML = "";
    }
    }
// Lyssnar när formuläret skickas
searchform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchValue = search.value;
    errorMessage.textContent = "";
    apiMessage.textContent = "";
    if (searchValue.trim() === "") {
    errorMessage.textContent = "Skriv in ett sökord";
        return;
    }
    await fetchRecipes(searchValue);
});