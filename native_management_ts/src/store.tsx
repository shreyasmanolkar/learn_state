import { useEffect, createContext, useContext, useReducer, useCallback, useMemo } from "react";

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
  search: string;
  setSearch: (search: string) => void;
}{
//   const [pokemon, setPokemon] = useState<Pokemon[]>([]);
//   const [search, setSearch] = useState("");

type PokemonState = {
    pokemon: Pokemon[];
    search: string;
}

type PokemonAction = {
    type: "setSearch";
    payload: string;
} | {
    type: "setPokemon";
    payload: Pokemon[];
}

    const [{pokemon, search}, dispatch] = useReducer((state: PokemonState, action: PokemonAction) => {
        switch(action.type){
            case "setPokemon":
                return {...state, pokemon: action.payload };
            
            case "setSearch":
                return { ...state, search: action.payload}
        }
    } ,{
        pokemon: [],
        search: "",
    })

  useEffect(() => {
    fetch("/pokemon.json")
      .then(response => response.json())
      .then(data => dispatch({
        type: "setPokemon",
        payload: data,
      }));
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({
        type: "setSearch",
        payload: search,
    });
  }, []);

  const filteredPokemon = useMemo(()=> 
  pokemon.filter((p) => p.name.toLowerCase().includes(search)).slice(0, 21) , 
  [pokemon, search]);

  const sortedPokemon = useMemo(()=>
    [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name))
  , [filteredPokemon]);

  return { pokemon: sortedPokemon, search, setSearch };
}

export function usePokemon(){
  return useContext(PokemonContext);
}

// -------------------------------------------------- context creation ----------------------------------------------------------

const PokemonContext = createContext< ReturnType<typeof usePokemonSource>> ( {} as unknown as ReturnType<typeof usePokemonSource> );

export function PokemonProvider({
    children,
}: {
    children: React.ReactNode;
}){
    return (
        <PokemonContext.Provider value={usePokemonSource()}>
            {children}
        </PokemonContext.Provider>
    )
};