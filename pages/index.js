import Head from "next/Head";
import Link from "next/Link";
import Layout from "../components/Layout";

export default function Home({ pokemon }) {
  return (
    <Layout title="Pokedex">
      <h1 className="text-4xl mb-8 text-center">NEXT JS</h1>
      <ul>
        {pokemon.map((pokeman, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border p-4 border-gray my-2 flex items-center text-lg bg-gray-200">
                <img
                  src={pokeman.image}
                  alt={pokeman.name}
                  className="w-20 h-20 mr-auto"
                />
                {pokeman.name.toUpperCase()}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (error) {
    console.log(error);
  }
}
