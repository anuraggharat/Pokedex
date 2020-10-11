import Link from "next/link";
import Layout from "../components/Layout";

export default function Home({ pokemon }) {
  return (
    <Layout title="Pokedex">
      <h1 className="text-4xl mb-8 text-center">POKEDEX</h1>
      <div class="grid grid-cols-1 gap-4 text-center lg:grid-cols-3 md:grid-cols-2">
        {pokemon.map((pokeman, index) => (
          <div key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a>
                <div className="rounded-lg hover:shadow-sm transition duration-200 ease-in-out hover:bg-white flex-col py-4 justify-items-center align-middle text-center bg-gray-200">
                  <img
                    src={pokeman.image}
                    alt={pokeman.name}
                    className="w-40 h-40 mx-auto"
                  />
                  <h2 className="text-xl font-bold mt-3 text-gray-900">
                    {pokeman.name.toUpperCase()}
                  </h2>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
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
