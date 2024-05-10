export enum SearchType {
  all = "",
  movie = "movie",
  series = "series",
  episode = "episode",
}

export interface SearchResult {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}

export interface SearchError {
  Response: string;
  Error: string;
}

export interface DetailsResult {
  Genre: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
  Directors: string;
  Actors: string;
  Website: string;
}

export const useApi = () => {
  /* constants for api and url */
  let url = "https://www.omdbapi.com/";
  let apikey = "f27abfd4";

  /* method to fetch search result using the api */
  const searchData = async (
    title: string,
    type: SearchType
  ): Promise<SearchResult[] | SearchError> => {
    const result = await fetch(
      `${url}?s=${encodeURI(title)}&type=${type}&apikey=${apikey}`
    );

    return result.json();
  };

  /* method to fetch details using the api */
  const getDetails = async (id: string): Promise<DetailsResult> => {
    const result = await fetch(`${url}?i=${id}&plot=full&apikey=${apikey}`);

    return result.json();
  };

  return { searchData, getDetails };
};

export default useApi;
