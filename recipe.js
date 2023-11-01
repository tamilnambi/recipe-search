const uri = sessionStorage.getItem("id");
const app_id = sessionStorage.getItem("app_id");
const app_key = sessionStorage.getItem("app_key");
const endpoint = sessionStorage.getItem('endpoint');
var healthLabelButtons = '';

// Get the loading element
const loadingElement = document.getElementById("loading");

// Show the loading element
loadingElement.style.display = "block";

// Create the URL with query parameters
const url = new URL(endpoint);
url.searchParams.append("r", uri);
url.searchParams.append("app_id", app_id);
url.searchParams.append("app_key", app_key);

// Make the API request using the fetch function
fetch(url)
.then((response) => {
  // Check if the request was successful
  if (response.status === 200) {
    // Hide the loading element
    loadingElement.style.display = "none";
    return response.json(); // Parse the JSON response
  } else {
    throw new Error(`Request failed with status code ${response.status}`);
  }
})
.then((data) => {
  // Process the recipe data (it may contain multiple recipes)

  document.getElementById('recipeName').innerHTML = data[0].label;
  document.getElementById('recipeImage').src = data[0].image;

  data[0].healthLabels.forEach( item =>{

        healthLabelButtons += `<button type="button" class="btn btn-warning m-2">${item}</button>`;
  });
  document.getElementById('healthLabels').innerHTML = healthLabelButtons;

  const ulContainer = document.getElementById('ingredients');
  const ulElement = document.createElement("ul");
  ulElement.className = "list-group";
  ulContainer.appendChild(ulElement);
  
  data[0].ingredientLines.forEach( item => {
    const liElement = document.createElement('li');
    liElement.className = "list-group-item";
    liElement.textContent = item;
    ulElement.appendChild(liElement);
  });
  document.getElementById('instructions').src = data[0].url;

})
.catch((error) => {
  console.error("Error:", error);
});