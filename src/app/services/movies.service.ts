import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MovieInterface} from "../interfaces/movie-interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  private readonly API_URL:string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  async getMovies(query:string = ''):Promise<Observable<MovieInterface>> {
    const options = {params: new HttpParams().set('s', query)}

    return this.http.get<never>(this.API_URL, options)
  }
}
