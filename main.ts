import { writeFile } from "fs/promises";
import { render, renderPokemon} from "./render.js";
import { loadPokemons} from "./pokemons.js"
const pokemons = await loadPokemons(50);
const html = render(pokemons);
//console.log(html);
await  writeFile('index.html', html);

for (const pok of pokemons) {   
    const html2 = renderPokemon(pok);
    await writeFile(`pokemon_${pok.name}.html`, html2)
}
