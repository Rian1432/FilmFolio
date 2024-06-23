import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MockApiFormDataInterface, MockApiResponseInterface} from "../interfaces/mock-api-interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MyMoviesAndSeriesService {
  private readonly API_URL:string = environment.baseUrl;
  private readonly MOCK_URL:string = environment.mockApi;

  constructor(private http: HttpClient) {}

  async index():Promise<Observable<MockApiResponseInterface[]>> {
    return this.http.get<never>(this.MOCK_URL)
  }

  async create(data: MockApiFormDataInterface):Promise<Observable<MockApiResponseInterface>> {
    return this.http.post<never>(this.MOCK_URL, data)
  }

  async update(data: MockApiFormDataInterface, id: string):Promise<Observable<MockApiResponseInterface>> {
    return this.http.put<never>(this.MOCK_URL + `/${id}`, data)
  }

  async destroy(id: string):Promise<Observable<MockApiResponseInterface>> {
    return this.http.delete<never>(this.MOCK_URL + `/${id}`)
  }
}
