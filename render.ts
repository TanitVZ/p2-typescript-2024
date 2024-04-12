import { writeFile } from "fs/promises";
import { Pokemon } from "./pokemons.js";
import { PokemonDetail } from "./pokemons.js";


const renderPokemons = (pokemons: Array<Pokemon>) => {
  let html = "";
  for (const pokemon of pokemons) {
    html += `<div><a href="#" onClick="window.open('./pokemon_${pokemon.name}.html', 'infoPokemon');">${pokemon.name}</a></div>`;
    html += `<div>${pokemon.typePok.toString()}</div>`;
    html += `<div><img src="${pokemon.photo}" title="Photo of ${pokemon.name}"</div>`;
  }
 
  return html;
};

const renderPokemonDetail = (pokemon : PokemonDetail) => {
    console.log("render pok detail 1");
    let html = "";
    html += `<div>${pokemon.name}</div>`
    html += `<div>Height:${pokemon.height}</div>`
    html += `<div>Weight:${pokemon.weight}</div>`
    html += `<div>Abilities:${pokemon.abilities.toString()}</div>`
    html += `<div>Moves:${pokemon.moves.toString()}</div>`

    return html;
}
export const render = (pokemons: Array<Pokemon>) => {
    let html = "";
  return `<html>
    <body>
    ${renderPokemons(pokemons)}
    </body>
    </html>`;
};

export const renderPokemon= (pokemonDetail : PokemonDetail) => {
    let html = "";
    return `<html>
      <body>
      ${renderPokemonDetail(pokemonDetail)}
      </body>
      </html>`;
}

const writePokemonDetail = (pokemonDetail : PokemonDetail) => {
    console.log("render pokemon");
    const html = renderPokemon(pokemonDetail);
    console.log("render pomeon 2");
    //console.log(html);
    writeFile('pokemon.html', html);

    
} 