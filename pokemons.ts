import { constants } from "bun:sqlite";




export class Pokemon {
  constructor(public name: string, public photo: string) {}
}

export class PokemonDetail extends Pokemon {
  constructor(public name: string, public photo: string, public height: string) {
    super(name, photo);
    this.height = height;
  }
}

class DataPokemon {
name! : string;
height! : number;
weight! : number;
sprites! : any;

getHeight() {
return this.height

}

getWeight() {
  return this.height;
}

getPhoto() {
  return this.sprites["front_default"];
}
}

export const loadPokemons = async (n: number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${n}`);  
  const { results } = (await response.json()) as { results: any[] };
//console.log("results", results);


 

  const pokemons: Array<Pokemon> = [];
  for (const { name, url } of results) {
    //console.log(url);
 
 const responseDetail = await fetch(`${url}`);
const details  = (await responseDetail.json() as any[]);
const test = Object.assign(new DataPokemon(), details);
console.log("height", test.getHeight());

//console.log("ABILITIES", JSON.stringify(details));

    pokemons.push(new Pokemon(name, test.getPhoto()));

  }
  return pokemons;
};
