import { useState, useEffect, createContext, useContext } from "react";

// -------------------------------------------------- interface ----------------------------------------------------------

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defence: number;
  speed: number;
};

// -------------------------------------------------- custom hook ----------------------------------------------------------

function usePokemonSource(): {
  pokemon: Pokemon[];
}{
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch("/pokemon.json")
      .then(response => response.json())
      .then(data => setPokemon(data));
  }, []);

  return { pokemon };
}

function usePokemon(){
  return useContext(PokemonContext);
}

// -------------------------------------------------- context creation ----------------------------------------------------------

const PokemonContext = createContext< ReturnType<typeof usePokemonSource>> ( {} as unknown as ReturnType<typeof usePokemonSource> );

// -------------------------------------------------- component ----------------------------------------------------------

const PokemonList = () => {
  const {pokemon} = usePokemon();
  return(
    <div>
      {
        pokemon.map((p) => (
          <div key={p.id}>{p.name}</div>
        ))
      }
    </div>
  )
};

// -------------------------------------------------- app ----------------------------------------------------------

function App() {  

  return (

    <PokemonContext.Provider value={usePokemonSource()}>
      <div>
        <PokemonList/>
      </div>
    </PokemonContext.Provider>

  );
}

export default App;
