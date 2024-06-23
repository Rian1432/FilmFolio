import { Component, OnInit } from '@angular/core';
import {MoviesAndSeriesService} from "../../services/movies-and-series.service";
import {MyMoviesAndSeriesService} from "../../services/my-movies-and-series.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {isEmpty} from "lodash";
import {RouterLink} from "@angular/router";
import {LoaderComponent} from "../../components/loader/loader.component";
import {MockApiFormDataInterface, MockApiResponseInterface} from "../../interfaces/mock-api-interface";

@Component({
  selector: 'app-my-movies',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgIf,
    RouterLink,
    LoaderComponent
  ],
  templateUrl: './my-movies.component.html',
})
export class MyMoviesComponent implements OnInit{
  public movieList:MockApiResponseInterface[] = [];
  public loading:boolean = false;

  constructor(private MyMoviesAndSeriesService: MyMoviesAndSeriesService) {
  }

  async getMyMovies():Promise<void> {
    this.loading = true;
    this.movieList = [];

    (await this.MyMoviesAndSeriesService.index())
      .subscribe({
        next: (data: MockApiResponseInterface[]) => {
          this.movieList = data;
        },
        error: (e) => console.error(e),
        complete: () => this.loading = false
      })
  }

  async removeMovie(id: string):Promise<void> {
    this.loading = true;

    (await this.MyMoviesAndSeriesService.destroy(id))
      .subscribe({
        next: () => {
          alert('Filme removido da lista com sucesso!');
          this.getMyMovies();
        },
        error: (e) => console.error(e),
        complete: () => this.loading = false
      })
  }

  async updateMovie(item: MockApiResponseInterface):Promise<void> {
    const formData:MockApiFormDataInterface = {
      title: item.title,
      year: item.year,
      imdbID: item.imdbID,
      type: item.type,
      watched: !item.watched,
      poster: item.poster,
    };

    this.loading = true;

    (await this.MyMoviesAndSeriesService.update(formData, item.id))
      .subscribe({
        next: () => {
          alert('Filme atualizado com sucesso!');
          this.getMyMovies();
        },
        error: (e) => console.error(e),
        complete: () => this.loading = false
      })
  }

  ngOnInit(): void {
    this.getMyMovies()
  }

  protected readonly isEmpty = isEmpty;
}
