import { SwapiInstance } from "../../packages/apis/swapi";
import { MoviedbInstance } from "../../packages/apis/moviedb";
import { KeyvInstance } from "../../packages/keyv";
import { withCache } from "../../packages/utils/hooks";

export type FilmQuery = {
  filmId: number;
}

export const getFilmWithDetails = async (ctx: {
  keyv: KeyvInstance,
  swapi: SwapiInstance,
  moviedb: MoviedbInstance,
}, query: FilmQuery) => {
  const { keyv, swapi, moviedb } = ctx;

  const getFilmByIdCached = withCache({
    key: `film:${query.filmId}`,
    ttl: 30 * 60, // 30 minutes
    fetchFn: () => swapi('@get/films/:id', { params: { id: Number(query.filmId) } }),
  })(keyv);

  const film = await getFilmByIdCached();
  const filmTitle = film.title.toLowerCase().replaceAll(' ', '-');
  const filmYear = new Date(film.release_date).getFullYear();
  const getMovieDetailsCached = withCache({
    key: `moviedb:search:${filmTitle}:${filmYear}`,
    ttl: 30 * 60, // 30 minutes
    fetchFn: () => moviedb(`@get/search/movie`, {
      query: {
        query: filmTitle,
        year: filmYear.toString(),
      }
    }),
  })(keyv);

  const movies = await getMovieDetailsCached();

  return {
    title: film.title,
    episode_id: film.episode_id,
    opening_crawl: film.opening_crawl,
    director: film.director,
    producer: film.producer,
    release_date: film.release_date,
    details: movies?.results?.find(m => m.original_title?.toLowerCase() === film.title.toLowerCase()) ?? null
  }
};