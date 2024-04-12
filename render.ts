import {Pokemon} from "./pokemons.js";


const renderPokemons = (pokemons : Array<Pokemon>) => {
    let html = "";
    for (const pokemon of pokemons) {
        
        html +=`<div>${pokemon.name}</div>`;
        html +=`<div>${pokemon.url}</div>`;
    }
   html += `</body></html>`;
    return html;

}
export const render = (pokemons : Array<Pokemon>) => {
    return `<html>
    <body>
    ${renderPokemons(pokemons)}
    </body>
    </html>`;
}