import {Pokemon} from "./pokemons.js";


const renderPokemons = (pokemons : Array<Pokemon>) => {
    let html = "";
    for (const pokemon of pokemons) {
        
        html +=`<div>${pokemon.name}</div>`;
        html +=`<div><img src="${pokemon.photo}" title="Photo of ${pokemon.name}"</div>`;
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