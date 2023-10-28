function getRecipies() {
  const ingredient = document.getElementById("ingredient").value;
  const app_id = "1f05a08d";
  const app_key = "a614fb15c7618687c8cd2382d7a980a9";
  const endpoint = "https://api.edamam.com/search";
  var recipedetails = "";
  var results = document.getElementById("results");
  let label = "";
  let image = "";
  let recipeJson = "";

  // Create the URL with query parameters
  const url = new URL(endpoint);
  url.searchParams.append("q", ingredient);
  url.searchParams.append("app_id", app_id);
  url.searchParams.append("app_key", app_key);

  // Make the API request using the fetch function
  fetch(url)
    .then((response) => {
      // Check if the request was successful
      if (response.status === 200) {
        return response.json(); // Parse the JSON response
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
    })
    .then((data) => {
      // Process the recipe data (it may contain multiple recipes)
      data.hits.forEach((recipe) => {
        label = recipe.recipe.label;
        image = recipe.recipe.image;
        recipeJson = JSON.stringify(recipe.recipe);
        recipedetails += `<div class="card m-3" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="image">
        <div class="card-body">
          <h5 class="card-title">${label}</h5>
          <button class="btn btn-warning" onclick="showRecipe("${recipeJson}")">View Recipe</button>
        </div>
      </div>`;
      });
      results.innerHTML = recipedetails;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function showRecipe(recipeJson) {
  const recipe = JSON.parse(recipeJson); // Parse the JSON string back to an object
  console.log(recipe);
}
