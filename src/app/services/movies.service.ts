import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ImdbResponseInterface, ImdbItemDetails} from "../interfaces/imdb-interface";
import {Observable} from "rxjs";
import {MockApiFormDataInterface, MockApiResponseInterface} from "../interfaces/mock-api-interface";

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  private readonly API_URL:string = environment.baseUrl;
  private readonly MOCK_URL:string = environment.mockApi;

  constructor(private http: HttpClient) {}

  async index(query:string = ''):Promise<Observable<ImdbResponseInterface>> {
    const options = {params: new HttpParams().set('s', query)}

    return this.http.get<never>(this.API_URL, options)
  }

  async getMovie(id: string | number):Promise<Observable<ImdbItemDetails>> {
    const options = {params: new HttpParams().set('i', id)}

    return this.http.get<never>(this.API_URL, options)
  }

  async saveMovie(data: MockApiFormDataInterface):Promise<Observable<MockApiResponseInterface>> {
    return this.http.post<never>(this.MOCK_URL, data)
  }

  async updateMovie(data: MockApiFormDataInterface, id: string):Promise<Observable<MockApiResponseInterface>> {
    return this.http.put<never>(this.MOCK_URL + `/${id}`, data)
  }

  async getMyMoviesAndSeries():Promise<Observable<MockApiResponseInterface[]>> {
    return this.http.get<never>(this.MOCK_URL)
  }

  async removeMovie(id: string):Promise<Observable<MockApiResponseInterface>> {
    return this.http.delete<never>(this.MOCK_URL + `/${id}`)
  }
}
