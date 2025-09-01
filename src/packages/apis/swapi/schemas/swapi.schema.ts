import { z } from "zod/mini";

export const filmSchema = z.object({
  title: z.string(),
  episode_id: z.number(),
  opening_crawl: z.string(),
  director: z.string(),
  producer: z.string(),
  release_date: z.string(),
  characters: z.array(z.string()),
  planets: z.array(z.string()),
  starships: z.array(z.string()),
  vehicles: z.array(z.string()),
  species: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export const filmsPaginatedSchema = z.object({
  count: z.number(),
  next: z.nullable(z.string()),
  previous: z.nullable(z.string()),
  results: z.array(filmSchema),
});

export const personSchema = z.object({
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),
  homeworld: z.string(),
  films: z.array(z.string()),
  species: z.array(z.string()),
  vehicles: z.array(z.string()),
  starships: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});


export const peoplePaginatedSchema = z.object({
  count: z.number(),
  next: z.nullable(z.string()),
  previous: z.nullable(z.string()),
  results: z.array(personSchema),
});

export const planetSchema = z.object({
  name: z.string(),
  rotation_period: z.string(),
  orbital_period: z.string(),
  diameter: z.string(),
  climate: z.string(),
  gravity: z.string(),
  terrain: z.string(),
  surface_water: z.string(),
  population: z.string(),
  residents: z.array(z.string()),
  films: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export const planetsPaginatedSchema = z.object({
  count: z.number(),
  next: z.nullable(z.string()),
  previous: z.nullable(z.string()),
  results: z.array(planetSchema),
});

export const starshipSchema = z.object({
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  cost_in_credits: z.string(),
  length: z.string(),
  max_atmosphering_speed: z.string(),
  crew: z.string(),
  passengers: z.string(),
  cargo_capacity: z.string(),
  consumables: z.string(),
  hyperdrive_rating: z.string(),
  MGLT: z.string(),
  starship_class: z.string(),
  pilots: z.array(z.string()),
  films: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export const starshipsPaginatedSchema = z.object({
  count: z.number(),
  next: z.nullable(z.string()),
  previous: z.nullable(z.string()),
  results: z.array(starshipSchema),
});

export const vehicleSchema = z.object({
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  cost_in_credits: z.string(),
  length: z.string(),
  max_atmosphering_speed: z.string(),
  crew: z.string(),
  passengers: z.string(),
  cargo_capacity: z.string(),
  consumables: z.string(),
  vehicle_class: z.string(),
  pilots: z.array(z.string()),
  films: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export const vehiclesPaginatedSchema = z.object({
  count: z.number(),
  next: z.nullable(z.string()),
  previous: z.nullable(z.string()),
  results: z.array(vehicleSchema),
});

export const speciesSchema = z.object({
  name: z.string(),
  classification: z.string(),
  designation: z.string(),
  average_height: z.string(),
  skin_colors: z.string(),
  hair_colors: z.string(),
  eye_colors: z.string(),
  average_lifespan: z.string(),
  homeworld: z.nullable(z.string()),
  language: z.string(),
  people: z.array(z.string()),
  films: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export const speciesPaginatedSchema = z.object({
  count: z.number(),
  next: z.nullable(z.string()),
  previous: z.nullable(z.string()),
  results: z.array(speciesSchema),
});
