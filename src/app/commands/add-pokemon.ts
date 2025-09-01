type AddPokemonCommand = {
  name: string;
  type: 'fire' | 'water' | 'grass' | 'electric';
  level: number;
}

export const addPokemonCommand = async (pokemon: AddPokemonCommand) => {

}
