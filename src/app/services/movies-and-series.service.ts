import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ImdbResponseInterface, ImdbItemDetails} from "../interfaces/imdb-interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MoviesAndSeriesService {
  private readonly API_URL:string = environment.baseUrl;
  private readonly MOCK_URL:string = environment.mockApi;

  constructor(private http: HttpClient) {}

  async index(query:string = ''):Promise<Observable<ImdbResponseInterface>> {
    const options = {params: new HttpParams().set('s', query)}

    return this.http.get<never>(this.API_URL, options)
  }

  async get(id: string | number):Promise<Observable<ImdbItemDetails>> {
    const options = {params: new HttpParams().set('i', id)}

    return this.http.get<never>(this.API_URL, options)
  }
}
