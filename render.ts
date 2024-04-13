import { writeFile } from "fs/promises";
import { Pokemon } from "./pokemons.js";
import { PokemonDetail } from "./pokemons.js";

const renderPokemons = (pokemons: Array<Pokemon>) => {
  let html = "";
  html += `<h1>Pokemon List</h1>`;
  for (const pokemon of pokemons) {
    html += `<div class="pokemon">`
    html += `<div><img src="${pokemon.photo}" title="Photo of ${pokemon.name}"</div>`;
    html += `<div class="name"><a href="#" onClick="window.open('./pokemon_${pokemon.name}.html', 'infoPokemon');">${pokemon.name}</a></div>`;
    html += `<div>${pokemon.typePok.toString()}</div>`;
   
  }

  return html;
};

const renderPokemonDetail = (pokemon: PokemonDetail) => {
  console.log("render pok detail 1");
  let html = "";
  html += `<div>${pokemon.name}</div>`;
  html += `<div>Height:${pokemon.height}</div>`;
  html += `<div>Weight:${pokemon.weight}</div>`;
  html += `<div>Abilities:${pokemon.abilities.toString()}</div>`;
  html += `<div>Moves:${pokemon.moves.toString()}</div>`;

  return html;
};

const htmlHead = (title : string) => {
  let head = "";

  head += `<meta charset="UTF-8" />`;
  head += `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`;
  head += `<link rel="stylesheet" href="styles.css" />`;
  head += `<title>${title}</title>`;
  return head;
};
export const render = (pokemons: Array<Pokemon>) => {
  let html = "";
  return `<html>
    <body>
    <head>
    ${htmlHead("Pokemon List")}
  </head>
  <main>
    ${renderPokemons(pokemons)}
    </main> 
    </body>
    </html>`;
};

export const renderPokemon = (pokemonDetail: PokemonDetail) => {
  let html = "";

  return `<html>(
    
      <body>
      <head>
        ${htmlHead(pokemonDetail.name)}
      </head>
      <main>
        ${renderPokemonDetail(pokemonDetail)}
      </main> 
      </body>
      </html>`;
};
