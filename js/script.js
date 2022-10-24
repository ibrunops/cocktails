const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

const name = document.getElementById("name");
const image = document.getElementById("image");
const instructions = document.getElementById("instructions");
const ingredients = document.getElementById("ingredients");

// function to get the data from the API
function getData(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => displayData(data));
  }

// function to display the data from the API
function displayData(cocktail) {
  const data = cocktail.drinks[0];
  name.innerHTML = data.strDrink;
  image.src = data.strDrinkThumb;
  instructions.innerHTML = data.strInstructions;
  ingredients.innerHTML = "";
  for (let i = 1; i <= 15; i++) {
    if (data[`strIngredient${i}`] === null) {
      break;
    } else { // check if the measure is null too, if it is, then don't display it, only the ingredient
        if (data[`strMeasure${i}`] === null) {
            ingredients.innerHTML += `<li>${data[`strIngredient${i}`]}</li>`;
        } else { // if the measure is not null, then display it with the ingredient
            ingredients.innerHTML += `<li>${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}</li>`;
        }
    }
    }
}

// function for search a cocktail by name
function searchCocktailByName() {
  const name = document.getElementById("search").value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  getData(url);
}

// event listener for the random button
document.getElementById("randomBtn").addEventListener("click", function() {
    getData(url);
  });

// event listener for the search button
document.getElementById("searchBtn").addEventListener("click", function() {
    searchCocktailByName();
  });
  
// run the getData function when the page loads
getData(url);