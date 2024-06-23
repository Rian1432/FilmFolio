interface Environment {
  baseUrl: string;
  mockApi: string;
}

export const environment:Environment = {
  baseUrl: 'http://www.omdbapi.com/?apikey=12119c8d',
  mockApi: 'https://667319676ca902ae11b31e58.mockapi.io/api/v1/my-movies'
};
