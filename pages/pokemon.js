import React from "react";
import Layout from "../components/Layout";
import Link from "next/Link";

export default function pokemon({ pokeman }) {
  console.log(pokeman);
  return (
    <Layout title={pokeman.name}>
      <h1 className="text-6xl font-bold mb-2 text-center capitalize">
        {pokeman.name.toUpperCase()}
      </h1>
      <div className="container my-4  text-center mx-auto">
        <div className="grid  grid-cols-3 mx-auto">
          <div className="flex flex-col">
            <p>Weight</p>
            <h2 className="bold text-3xl">{pokeman.weight}</h2>
          </div>
          <div className="flex flex-col">
            <p>Height</p>
            <h2 className="bold text-3xl">{pokeman.height}</h2>
          </div>
          <div className="flex flex-col">
            <p>Experience</p>
            <h2 className="bold text-3xl">{pokeman.base_experience}</h2>
          </div>
        </div>
      </div>
      <img className="mx-auto" src={pokeman.image} alt={pokeman.name} />
      <div></div>
      <Link href="/">
        <a>Home</a>
      </Link>
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
