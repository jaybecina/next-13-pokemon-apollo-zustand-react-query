export interface IPokemons {
  pokemon_v2_pokemon: any[];
  name: string;
  pokemon_species_id: number;
  id: number;
  pokemon_v2_pokemontypes?: {
    pokemon_v2_type: {
      id: number;
      name: string;
    }[];
  }[];
}

export interface PokemonType {
  __typename: "pokemon_v2_pokemontype";
  pokemon_v2_type: {
    __typename: "pokemon_v2_type";
    name: string;
  };
}

export interface IPokemon {
  __typename: "pokemon_v2_pokemon";
  name: string;
  pokemon_species_id: number;
  id: number;
  pokemon_v2_pokemontypes: PokemonType[];
}
