import { writeFile } from "fs/promises";
import { Pokemon } from "./pokemons.js";
import { PokemonDetail } from "./pokemons.js";
import { VarietyPokemon } from "./pokemons.js";

const renderPokemons = (pokemons: Array<Pokemon>) => {
  let html = "";
  html += `<h1>Pokemon List</h1>`;
  for (const pokemon of pokemons) {
    html += `<div class="pokemon">`;
    html += `<div><img src="${pokemon.photo}" title="Photo of ${pokemon.name}"></div>`;
    html += `<div class="data">`;
    html += `<div class="name"><a href="#" onClick="window.open('./pokemon_${pokemon.name}.html', 'infoPokemon');">${pokemon.name}</a></div>`;
    html += `<div class="types">${pokemon.typePok.join("-")}</div>`;
    html += `</div>`;
    html += `</div>`;
  }

  return html;
};

const renderPokemonDetail = (pokemon: PokemonDetail) => {
  //console.log("render pok detail 1");
  const urlImgPok = "https://img.pokemondb.net/artwork/";
  let html = "";
  html += `<div class="pokemonDetail">`;
  html += `<div class="name">${pokemon.name}</div>`;
  html += `<div class="fieldId">${pokemon.id}</div>`;
  html += `<div class="info">`;
  html += `<div><img src="${urlImgPok}${pokemon.name}.jpg" title="Photo of ${pokemon.name}"></div>`;
  html += `<div class="basic">`;
  html += `<div class="label">Height:</div><div class="measure">${pokemon.height} m</div>`;
  html += `<div class="label">Weight:</div><div class="measure">${pokemon.weight} Kg</div>`;
  html += `<div class="label">Abilities:</div><div class="field">${pokemon.abilities.join(
    ", "
  )}</div>`;
  html += `</div>`;
  html += `</div>`;
  html += `<div class="label">Habitat:</div><div class="field">${pokemon.habitat}</div>`;
  html += `${addVarieties(
    pokemon.varieties
  )}</div>`;
  html += `<div class="label">Moves:</div><div class="field">${addMoves(
    pokemon.moves
  )}</div>`;

  html += `</div>`;
  return html;
};

const htmlHead = (title: string) => {
  let head = "";

  head += `<meta charset="UTF-8" />`;
  head += `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`;
  head += `<link rel="stylesheet" href="styles.css" />`;
  head += `<title>${title}</title>`;
  return head;
};

const addVarieties = (variet: Array<VarietyPokemon>) => {
  let strHtml = "";
  let o = [];
 // console.log(variet);
  if (variet.length > 0) {
    for (const v of variet) {
    o.push(v.name);
  }
  strHtml = `<div class="label">Varieties:</div><div class="field">${o.join(", ")}</div>`;

}
  else 
    strHtml = "";
  return strHtml;
};
const addMoves = (moves: Array<string>) => {
  let ulElement = `<ul class="columns">`;

  moves.sort();

  for (const m of moves) {
    ulElement += `<li>${m}</li>`;
  }

  ulElement += "</ul>";

  return ulElement;
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

  return `<html>   
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
