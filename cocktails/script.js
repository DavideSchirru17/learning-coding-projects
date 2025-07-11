// get the input

// function get the drink by first letter
async function firstLetterDrink() {
  // c if the input is empty with out a text give me an error
  // d if the input is not a singular letter from a to z give me an error

  // 3 fetching the url from the server cocktail

  try {
    const input = document.getElementById("input").value;
    const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
    const urlLetter = `${url}${input}`;

    const response = await fetch(urlLetter);
    const data = await response.json();
    console.log(data);
    console.log(data.drinks);
    console.log(data.drinks[0]);
    console.log(data.drinks[0].strIngredient1);

    // get all the objects from json who has strIngredient(1)

    const idDrink = data.drinks[0].idDrink;
    const strDrink = data.drinks[0].strDrink;
    const strGlass = data.drinks[0].strGlass;
    const strDrinkThumb = data.drinks[0].strDrinkThumb;
    const strInstructions = data.drinks[0].strInstructions;
    const strIngredient1 = data.drinks[0].strIngredient1;
    const strIngredient2 = data.drinks[0].strIngredient2;
    const strIngredient3 = data.drinks[0].strIngredient3;

    // 4 display to each element of the html the datas from the server
    document.getElementById("idDrink").innerHTML = idDrink;
    document.getElementById("strDrink").innerHTML = strDrink;
    document.getElementById("strGlass").innerHTML = strGlass;
    document.getElementById("strDrinkThumb").src = strDrinkThumb;
    document.getElementById("description-drink").innerHTML = strInstructions;
    document.getElementById("ingredient-1").innerHTML = strIngredient1;
    document.getElementById("ingredient-2").innerHTML = strIngredient2;
    document.getElementById("ingredient-3").innerHTML = strIngredient3;
  } catch (error) {
    console.error("Fetching data not working");
  }

  // FETCHING COCKTAIL INSERTING THE LETTER - BY FIRST LETTER
}

// another function
// if i click multiple times on the button
// i get a random cocktail from id?
