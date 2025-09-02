import { SingleTableInstance } from "../../packages/dynamodb";
import { randomUUID } from "node:crypto";

type AddPokemonCommand = {
  name: string;
  type: 'fire' | 'water' | 'grass' | 'electric';
  level: number;
}

export const addPokemon = async (ctx: {
  db: SingleTableInstance
}, pokemon: AddPokemonCommand) => {
  const id = randomUUID()
  console.log('Adding Pokemon with ID:', id);
  console.log('Pokemon data:', pokemon);
  await ctx.db.repositories.pokemon.put({
    pk: 'POKEMON',
    sk: id,
    name: pokemon.name,
    type: pokemon.type,
    level: pokemon.level,
  })

  return { id, ...pokemon }
}
