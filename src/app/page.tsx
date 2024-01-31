"use client";
import { useState, useEffect } from "react";
import { Table, Tag, Spin } from "antd";
import { useGetAllPokemon } from "../hooks/useGetPokemon";
import Link from "next/link";
import { redirect } from "next/navigation";
import { usePokeStore } from "@/lib/zustand/store";
import { useToastify } from "@/hooks/useToastify";
import Spinner from "./components/Spinner";

export default function Home() {
  const { pokemonList, loading, error } = useGetAllPokemon();

  const { allPokemonData, setAllPokemonData } = usePokeStore();

  useEffect(() => {
    let mounted = true;

    if (error) {
      useToastify("error", "Something went wrong");
    }

    if (mounted && pokemonList?.pokemon_v2_pokemon?.length > 0) {
      setAllPokemonData(pokemonList?.pokemon_v2_pokemon);
    }
    console.log(pokemonList);

    return () => {
      mounted = false;
    };
  }, [pokemonList, error]);

  const columns = [
    {
      title: "Image",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt="Pokemon Image"
            width={0}
            height={0}
            style={{ width: 150, height: 100, objectFit: "contain" }}
          />
        </>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <>
          <strong>{name.toUpperCase()}</strong>
        </>
      ),
    },
    {
      title: "Types",
      dataIndex: "pokemon_v2_pokemontypes",
      key: "pokemon_v2_pokemontypes",
      render: (types: any) => (
        <>
          {types.map((type: any) => (
            <Tag key={type.pokemon_v2_type.id}>{type.pokemon_v2_type.name}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id: any, name: any, types: any) => (
        <>
          {/* <Button onClick={() => handleOnClick(id, name, types)}>View</Button> */}
          <Link href={`/details/${id}`}>View</Link>
        </>
      ),
    },
  ];

  return (
    <>
      <header className="bg-white mb-4">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Welcome to Pokemon Home Page
          </h1>
        </div>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!loading ? (
          <Table
            loading={loading}
            columns={columns}
            dataSource={allPokemonData}
            size="large"
          />
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}
