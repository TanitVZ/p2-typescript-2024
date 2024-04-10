

export const loadPokemons = async (n: number)  => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${n}`);
  const {results} = (await response.json()) as { results: any[] };
const pokemons : Array<string> = []
for (const pok of results) {
    //console.log(pok);
    pokemons.push(pok);
}
  return pokemons;
};
