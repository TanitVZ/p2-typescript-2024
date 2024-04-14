import { constants } from "bun:sqlite";

export type VarietyPokemon = {
  name?: string;
  isDefault?: boolean;
};

type Ability = {
  ability: {
name : string;

  };
}

type Type = {
  type: {
    name : string;
    
      };
}

type Move = {
  move: {
    name : string;
    
      };

}

export class Pokemon {
  constructor(public name: string, public photo: string, public typePok: string[]) {}
}

export class PokemonDetail extends Pokemon {
  constructor(
    public id: number,
    public name: string,
    public urlSpecies: string,
    public photo: string,
    public typePok: string[],
    public height: number,
    public weight: number,
    public abilities: string[],
    public moves: string[],
    public habitat: string,
    public eggs: string[],
    public evolvesFrom: string,
    public varieties: VarietyPokemon[]
  ) {
    super(name, photo, typePok);
    // this.height = height;
    // this.weight = weight;
  }
}

class DataPokemon {
  id!: number;
  name!: string;
  species!: {url: string};
  height!: number;
  weight!: number;
  sprites!: {front_default: string};
  types!: Type[];
  abilities!: Ability[];
  moves!: Move[];

  getId() {
    return this.id;
  }
  getHeight() {
    return this.height / 10;
  }

  getWeight() {
    return this.weight / 10;
  }

  getPhoto() {
    return this.sprites.front_default;
  }

  getUrlSpecies() {
    return this.species.url;
  }

  getTypes() {
    let a = [];
    for (const t of this.types) {
      a.push(t.type.name);
    }

    return a;
  }

  getAbilities() {
    let a = [];
    for (const t of this.abilities) {
        a.push(t.ability.name);
    }

    return a;
  }

  getMoves() {
    let a = [];
    for (const t of this.moves) {
      a.push(t.move.name);
    }

    return a;
  }
}

class SpeciesPokemon {
  name!: string;
  habitat!: {name : string};
  egg_groups!: {name : string}[];
  evolves_from_species!: {name : string};
  varieties!: VarietyPokemon[];

  getHabitat() {
    return this.habitat.name;
  }

  getEggGroups() {
    let a = [];
    for (const e of this.egg_groups) {
      a.push(e.name);
    }

    return a;
  }

  getEvolvesFrom() {
    if (
      this.evolves_from_species !== null &&
      typeof this.evolves_from_species === "object"
    )
      return this.evolves_from_species.name;
    else return "";
  }

  getVarieties() {
    let variety: VarietyPokemon[] = [];
   
    for (const v of this.varieties) {
      let a: VarietyPokemon = {};
      a.name = v.name;   
      a.isDefault = v.isDefault;
    
      variety.push(a);
    }
    const varietyOnly = variety.filter((o) => o.isDefault === false);
    return varietyOnly;
  }
}
export const loadPokemons = async (n: number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${n}`);
  const { results } = (await response.json()) as { results: any[] };
  //console.log("results", results);

  const pokemons: Array<PokemonDetail> = [];
  for (const { name, url } of results) {
  

    const responseDetail = await fetch(`${url}`);
    const details = (await responseDetail.json()) as any[];


    const pok = Object.assign(new DataPokemon(), details);


    const responseSpecies = await fetch(`${pok.getUrlSpecies()}`);
    const species = (await responseSpecies.json()) as any[];
    const pokSpecies = Object.assign(new SpeciesPokemon(), species);

    pokemons.push(
      new PokemonDetail(
        pok.getId(),
        name,
        pok.getUrlSpecies(),
        pok.getPhoto(),
        pok.getTypes(),
        pok.getHeight(),
        pok.getWeight(),
        pok.getAbilities(),
        pok.getMoves(),
        pokSpecies.getHabitat(),
        pokSpecies.getEggGroups(),
        pokSpecies.getEvolvesFrom(),
        pokSpecies.getVarieties()
      )
    );
  }
  return pokemons;
};
