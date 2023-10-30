const uri = sessionStorage.getItem("id");
const app_id = sessionStorage.getItem("app_id");
const app_key = sessionStorage.getItem("app_key");
const endpoint = sessionStorage.getItem('endpoint');
console.log(uri);
console.log(app_id);
console.log(app_key);
console.log(endpoint);
// Create the URL with query parameters
const url = new URL(endpoint);
url.searchParams.append("r", uri);
url.searchParams.append("app_id", app_id);
url.searchParams.append("app_key", app_key);
console.log(url);
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
  console.log(data);
})
.catch((error) => {
  console.error("Error:", error);
});