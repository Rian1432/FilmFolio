export interface MockApiResponseInterface {
  id: string;
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
  watched: boolean;
  createdAt: string;
}

export interface MockApiFormDataInterface {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
  watched: boolean;
}
