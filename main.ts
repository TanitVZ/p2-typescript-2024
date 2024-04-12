import { writeFile } from "fs/promises";
import { render} from "./render.js";
import { loadPokemons} from "./pokemons.js"
const pokemons = await loadPokemons(10);
const html = render(pokemons);
//console.log(html);
await  writeFile('index.html', html);
