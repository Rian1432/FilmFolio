import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MovieDetails, MovieInterface, SaveMovieDataInterface} from "../interfaces/movie-interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  private readonly API_URL:string = environment.baseUrl;
  private readonly MOCK_URL:string = environment.mockApi;

  constructor(private http: HttpClient) {}

  async index(query:string = ''):Promise<Observable<MovieInterface>> {
    const options = {params: new HttpParams().set('s', query)}

    return this.http.get<never>(this.API_URL, options)
  }

  async getMovie(id: string | number):Promise<Observable<MovieDetails>> {
    const options = {params: new HttpParams().set('i', id)}

    return this.http.get<never>(this.API_URL, options)
  }

  async saveMovie(data: {
    year: string;
    imdbID: string;
    title: string;
    type: string;
    poster: string;
    watched: boolean;
  }):Promise<Observable<SaveMovieDataInterface>> {
    return this.http.post<never>(this.MOCK_URL, data)
  }

  async updateMovie(data: {
    year: string;
    imdbID: string;
    title: string;
    type: string;
    poster: string;
    watched: boolean;
  }, id: string):Promise<Observable<SaveMovieDataInterface>> {
    return this.http.put<never>(this.MOCK_URL + `/${id}`, data)
  }

  async getMyMoviesAndSeries():Promise<Observable<SaveMovieDataInterface[]>> {
    return this.http.get<never>(this.MOCK_URL)
  }

  async removeMovie(id: string):Promise<Observable<SaveMovieDataInterface>> {
    return this.http.delete<never>(this.MOCK_URL + `/${id}`)
  }
}
