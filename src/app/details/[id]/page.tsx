"use client";
import React, { useState, useEffect } from "react";
import { Spin, Divider, Button } from "antd";
import { useGetOnePokemon } from "../../../hooks/useGetPokemon";
import styles from "../../../styles/details/styles.module.css";
import Spinner from "../../components/Spinner";
import { useToastify } from "@/hooks/useToastify";
import { usePokeStore } from "@/lib/zustand/store";

const Details = ({
  params,
  searchParams,
}: {
  params: { slug: string; id: number };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const id_str = params.id.toString(); // Convert 'params.id' to a string
  const id_int = parseInt(id_str, 10);
  const { pokemon, loading, error } = useGetOnePokemon(id_int);

  const { pokemonData, setPokemonData } = usePokeStore();

  useEffect(() => {
    let mounted = true;

    if (error) {
      useToastify("error", "Something went wrong");
    }

    if (mounted && pokemon?.pokemon_v2_pokemon?.length > 0) {
      setPokemonData(pokemon?.pokemon_v2_pokemon);
      console.log(pokemon?.pokemon_v2_pokemon);
    }

    return () => {
      mounted = false;
    };
  }, [pokemon, error]);

  useEffect(() => {
    console.log("dataSource: ", pokemonData[0]);
  }, [pokemonData]);

  return (
    <div className={styles.bgContainer}>
      <header className="bg-white mb-4">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Pokemon Detail Page
          </h1>
          <div className="relative lg:absolute lg:left-[30px]">
            <Button
              href="/"
              className="w-[100px] px-[20px] py-[5px] top-[10px] lg:top-[-40px] bg-blue-500 text-white"
            >
              Back
            </Button>
          </div>
        </div>
      </header>
      {!loading ? (
        <>
          <h1 className="font-bold text-6xl text-center text-white my-4">
            {pokemonData[0]?.name?.toUpperCase()}
          </h1>
          <Divider className="my-10" />
          <div className="flex justify-center">
            <div className="rounded-full bg-slate-200 w-[400px] h-[400px] group relative">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData[0]?.id}.png`}
                alt="Pokemon Image"
                width={0}
                height={0}
                style={{ width: 400, height: 400, objectFit: "cover" }}
                className="transition-transform transform scale-100 group-hover:scale-110"
              />
            </div>
          </div>
          <Divider className="my-10" />
          <div className="p-4 flex justify-center">
            <div className="p-4 bg-white">
              <div className="flex mb-3">
                <h3 className="font-bold text-lg text-left mr-3">
                  Pokemon Number:
                </h3>
                <h3 className="font-bold text-lg text-left">
                  {pokemonData[0]?.id}
                </h3>
              </div>

              <div className="flex">
                <h3 className="font-bold text-lg text-left mr-3">
                  Pokemon Types:
                </h3>
                {pokemonData[0]?.pokemon_v2_pokemontypes?.map(
                  (item: any, i: number) => (
                    <h3 className="font-bold text-lg text-left">
                      {item?.pokemon_v2_type?.name?.toUpperCase()}
                      {pokemonData[0]?.pokemon_v2_pokemontypes?.length > 0 &&
                      pokemonData[0]?.pokemon_v2_pokemontypes?.length - 1 !==
                        i ? (
                        <span className="mr-2">, </span>
                      ) : (
                        " "
                      )}
                    </h3>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Details;
