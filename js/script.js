const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

const drink = document.getElementById("name");
const image = document.getElementById("image");
const instructions = document.getElementById("instructions");
const ingredients = document.getElementById("ingredients");

// function to get the data from the API
function getData(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => displayData(data))
      .catch(error => console.log(error) + displayError());
  }

// function to change the content of a document.getElement...
function changeContent(docElement , content) {
    docElement.innerHTML = content;
}

// function to display an error message if the API doesn't return any data
const errorSearch = document.getElementById("errorSearch");
function displayError() {    
    if (errorSearch) {
      changeContent(errorSearch, "Sorry, we couldn't find that cocktail");
    }
}

// function to display the data from the API
function displayData(data) {
  const cocktail = data.drinks[0];
  drink.innerHTML = cocktail.strDrink;
  image.src = cocktail.strDrinkThumb;
  instructions.innerHTML = cocktail.strInstructions;
  ingredients.innerHTML = "";
  for (let i = 1; i <= 15; i++) {
    if (cocktail[`strIngredient${i}`] === null) {
      break;
    } else { // check if the measure is null too, if it is, then don't display it, only the ingredient
        if (cocktail[`strMeasure${i}`] === null) {
            ingredients.innerHTML += `<li>${cocktail[`strIngredient${i}`]}</li>`;
        } else { // if the measure is not null, then display it with the ingredient
            ingredients.innerHTML += `<li>${cocktail[`strIngredient${i}`]} - ${cocktail[`strMeasure${i}`]}</li>`;
          }
      }
  }
  if (errorSearch) { // if the error message is displayed, then remove it
    changeContent(errorSearch, "");
  }
}

// function for search a cocktail by name
function searchCocktailByName() {
  const cocktail = document.getElementById("search").value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;
  getData(url);
}

// if the user presses enter on the search input, then search the cocktail
const search = document.getElementById("search");
if (search) {
  search.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("searchBtn").click();
    }
  });
}

// event listener for the random button (? means ask fisrt if the random button exists)
document.getElementById("randomBtn")?.addEventListener("click", function() {
    getData(url);
  });

// event listener for the search button (? means ask fisrt if the search button exists)
document.getElementById("searchBtn")?.addEventListener("click", function() {
    searchCocktailByName();
  });
  
// run the getData function when the page loads
// getData(url);