export interface MovieInterface {
  Response: string;
  Search: SearchInterface[];
  totalResults: string;
}

export interface SearchInterface {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
