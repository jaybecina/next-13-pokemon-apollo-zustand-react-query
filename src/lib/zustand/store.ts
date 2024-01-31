// store.ts
import { create } from "zustand";
import { IPokemon } from "@/types/interfaces";

interface PokeStore {
  allPokemonData: IPokemon[];
  setAllPokemonData: (data: IPokemon[]) => void;
  pokemonData: IPokemon[];
  setPokemonData: (data: IPokemon[]) => void;
}

export const usePokeStore = create<PokeStore>((set) => ({
  allPokemonData: [],
  setAllPokemonData: (data) => set({ allPokemonData: data }),
  pokemonData: [],
  setPokemonData: (data) => set({ pokemonData: data }),
}));
