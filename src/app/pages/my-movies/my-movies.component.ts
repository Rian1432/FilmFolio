import { Component, OnInit } from '@angular/core';
import {SaveMovieDataInterface} from "../../interfaces/movie-interface";
import {MoviesService} from "../../services/movies.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {isEmpty} from "lodash";
import {RouterLink} from "@angular/router";
import {LoaderComponent} from "../../components/loader/loader.component";

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
  public movieList:SaveMovieDataInterface[] = [];
  public loading:boolean = false;

  constructor(private MoviesService: MoviesService,) {
  }

  async getMyMovies():Promise<void> {
    this.loading = true;
    this.movieList = [];

    (await this.MoviesService.getMyMoviesAndSeries())
      .subscribe({
        next: (data: SaveMovieDataInterface[]) => {
          this.movieList = data;
        },
        error: (e) => console.error(e),
        complete: () => this.loading = false
      })
  }

  async removeMovie(id: string):Promise<void> {
    this.loading = true;

    (await this.MoviesService.removeMovie(id))
      .subscribe({
        next: () => {
          alert('Filme removido da lista com sucesso!');
          this.getMyMovies();
        },
        error: (e) => console.error(e),
        complete: () => this.loading = false
      })
  }

  async updateMovie(item: SaveMovieDataInterface):Promise<void> {
    const formData = {
      title: item.title,
      year: item.year,
      imdbID: item.imdbID,
      type: item.type,
      watched: !item.watched,
      poster: item.poster,
    };

    this.loading = true;

    (await this.MoviesService.updateMovie(formData, item.id))
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
