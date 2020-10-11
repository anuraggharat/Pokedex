import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

export default function pokemon({ pokeman }) {
  return (
    <Layout title={pokeman.name}>
      <h1 className="text-6xl font-bold mb-2 text-center text-gray-800 capitalize">
        {pokeman.name.toUpperCase()}
      </h1>
      <div className="container my-4  text-center mx-auto">
        <div className="grid  grid-cols-3 mx-auto">
          <div className="flex flex-col">
            <p className="text-gray-600">Weight</p>
            <h2 className="font-bold text-4xl">{pokeman.weight}</h2>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-600">Height</p>
            <h2 className="font-bold text-4xl">{pokeman.height}</h2>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-600">Experience</p>
            <h2 className="font-bold text-4xl">{pokeman.base_experience}</h2>
          </div>
        </div>
      </div>
      <img className="mx-auto" src={pokeman.image} alt={pokeman.name} />
      <div className="container">
        <div className="grid mt-5">
          <h4 className="mb-2  text-2xl">TYPES:</h4>
          <div className="flex">
            {pokeman.types.map((type) => (
              <p
                key={type.type.name}
                className=" hover:shadow-lg hover:text-gray-800 hover:bg-white bg-gray-800 text-xl py-1 rounded-full  text-white px-8 mr-2"
              >
                {type.type.name}
              </p>
            ))}
          </div>
        </div>

        <div className="grid mt-5">
          <h4 className="mb-2  text-2xl">ABILITY:</h4>
          <div className="flex">
            {pokeman.abilities.map((ability) => (
              <p
                key={ability.ability.name}
                className=" hover:shadow-lg hover:text-gray-800 hover:bg-white bg-gray-800 mr-2 py-1 text-xl rounded-full px-8 text-white"
              >
                {ability.ability.name}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="container mt-4 pt-8">
        <h1 className="text-6xl text-center ">STATS</h1>
        <div className="flex justify-items-center align-middle flex-wrap  mt-5">
          {pokeman.stats.map((stat) => (
            <div
              key={stat.stat.name}
              className=" hover:shadow-lg hover:text-gray-800 hover:bg-white text-center w-2/5 flex-none text-white transition duration-500 ease-in-out py-5  mx-auto  my-4 rounded-lg bg-gray-800"
            >
              <h1 className="text-4xl font-bold ">{stat.base_stat}</h1>
              <p>{stat.stat.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="container my-5 text-center">
        <Link href="/">
          <a className="text-2xl underline text-center">Home</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedIndex = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    pokeman.image = image;
    return {
      props: { pokeman },
    };
  } catch (error) {
    console.log(error);
  }
}
