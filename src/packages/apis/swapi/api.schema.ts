import { createSchema } from "@better-fetch/fetch";
import { filmSchema, filmsPaginatedSchema, peoplePaginatedSchema, personSchema, planetSchema, planetsPaginatedSchema, speciesPaginatedSchema, speciesSchema, starshipSchema, starshipsPaginatedSchema, vehicleSchema, vehiclesPaginatedSchema } from "./schemas/swapi.schema";
import { idParamSchema } from "./schemas/common.schema";

export const apiSchema = createSchema({
  "@get/films": {
    output: filmsPaginatedSchema,
  },
  "@get/films/:id": {
    output: filmSchema,
    params: idParamSchema,
  },
  "@get/people": {
    output: peoplePaginatedSchema
  },
  "@get/people/:id": {
    output: personSchema,
    params: idParamSchema,
  },
  "@get/planets": {
    output: planetsPaginatedSchema
  },
  "@get/planets/:id": {
    output: planetSchema,
    params: idParamSchema,
  },
  "@get/species": {
    output: speciesPaginatedSchema
  },
  "@get/species/:id": {
    output: speciesSchema,
    params: idParamSchema,
  },
  "@get/vehicles": {
    output: vehiclesPaginatedSchema
  },
  "@get/vehicles/:id": {
    output: vehicleSchema,
    params: idParamSchema,
  },
  "@get/starships/:id": {
    output: starshipSchema,
    params: idParamSchema,
  },
  "@get/starships": {
    output: starshipsPaginatedSchema
  },
});