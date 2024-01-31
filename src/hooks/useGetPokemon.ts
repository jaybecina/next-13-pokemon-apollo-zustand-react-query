import { useQuery, gql } from "@apollo/client";
import { usePokeStore } from "@/lib/zustand/store";

export const useGetAllPokemon = () => {
  const FETCH_ALL_POKEMONS = gql`
    query samplePokeAPIquery {
      pokemon_v2_pokemon(limit: 100) {
        name
        pokemon_species_id
        id
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  `;

  const { data: pokemonList, loading, error } = useQuery(FETCH_ALL_POKEMONS);

  return {
    pokemonList,
    loading,
    error,
  };
};

export const useGetOnePokemon = (id: number) => {
  const FETCH_ONE_POKEMON = gql`
    query samplePokeAPIquery($id: Int!) {
      pokemon_v2_pokemon(limit: 100, where: { id: { _eq: $id } }) {
        name
        pokemon_species_id
        id
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  `;

  const {
    data: pokemon,
    loading,
    error,
  } = useQuery(FETCH_ONE_POKEMON, {
    variables: { id },
  });

  return {
    pokemon,
    loading,
    error,
  };
};
