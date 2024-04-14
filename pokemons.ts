import { constants } from "bun:sqlite";

type TypePok = {
  slot: number;
  type: string[];
};

export class Pokemon {
  constructor(public name: string, public photo: string, public typePok: any) {}
}

export class PokemonDetail extends Pokemon {
  constructor(
    public id: number,
    public name: string,
    public photo: string,
    public typePok: any,
    public height: number,
    public weight: number,
    public abilities: any,
    public moves: any
  ) {
    super(name, photo, typePok);
    // this.height = height;
    // this.weight = weight;
  }
}

class DataPokemon {
  id!: number;
  name!: string;
  height!: number;
  weight!: number;
  sprites!: any;
  types!: any;
  abilities!: any;
  moves!: any;

  getId() {
    return this.id;
  }
  getHeight() {
    
    return this.height/10;
  }

  getWeight() {
    return this.weight/10;
  }

  getPhoto() {
    return this.sprites["front_default"];
  }

  getTypes() {
    let a = [];
    for (const t of this.types) {
      a.push(t["type"]["name"]);
    }

    return a;
  }

  getAbilities() {
    let a = [];
    for (const t of this.abilities) {
      a.push(t["ability"]["name"]);
    }

    return a;
  }

  getMoves() {
    let a = [];
    for (const t of this.moves) {
      a.push(t["move"]["name"]);
    }

    return a;
  }
}

export const loadPokemons = async (n: number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${n}`);
  const { results } = (await response.json()) as { results: any[] };
  //console.log("results", results);

  const pokemons: Array<PokemonDetail> = [];
  for (const { name, url } of results) {
    //console.log(url);

    const responseDetail = await fetch(`${url}`);
    const details = (await responseDetail.json()) as any[];
    const pok = Object.assign(new DataPokemon(), details);



    pokemons.push(
      new PokemonDetail(
        pok.getId(),
        name,
        pok.getPhoto(),
        pok.getTypes(),
        pok.getHeight(),
        pok.getWeight(),
        pok.getAbilities(),
        pok.getMoves()
      )
    );
  }
  return pokemons;
};
