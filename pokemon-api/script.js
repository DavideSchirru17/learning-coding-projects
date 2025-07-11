const url = "https://pokeapi.co/api/v2/pokemon/5/";

async function getPokemon() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    document.getElementById("sprites").src =
      data.sprites.other.dream_world.front_default;
    document.getElementById("name").innerHTML = data.id;
    document.getElementById("id").innerHTML = data.id;
    document.getElementById("move").innerHTML = data.moves[0].move.name;
  } catch (error) {
    console.error(error);
  }
}
// get pokemon in a loop

async function getLoopPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await response.json();
  const result = data.results;
  console.log(result); // array of 20 pokemon

  // 1. pick a random index
  const randomIndex = Math.floor(Math.random() * result.length);
  console.log(randomIndex);
  const randomPokemon = result[randomIndex];
  console.log("getting the object pokemon ", randomPokemon);

  //2  fetch random pokemon associated to the index

  const pokemonResponse = await fetch(randomPokemon.url);
  const jsonImage = await pokemonResponse.json();
  console.log("url pokemon", jsonImage);
  const sprites = jsonImage.sprites.front_default;

  // now i can display
  document.getElementById("sprites-loop").src = sprites;
  document.getElementById("name-loop").innerHTML = randomPokemon.name;
  document.getElementById("id-loop").innerHTML = randomIndex;
}
