import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {MoviesService} from "../../services/movies.service";
import {NgForOf, NgIf} from "@angular/common";
import {MovieInterface, SearchInterface} from "../../interfaces/movie-interface";
import {LoaderComponent} from "../../components/loader/loader.component";
import { debounce } from "lodash";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    NgForOf,
    NgIf,
    LoaderComponent
  ],
  templateUrl: './movies.component.html',
})
export class MoviesComponent {
  public inputValue:string = '';
  public movieList:SearchInterface[] = [];
  public loading:boolean = false;
  public searchForMovies = debounce(this.getMovies, 300);

  constructor(private service: MoviesService) {}

  async getMovies():Promise<void> {
    this.loading = true;
    this.movieList = [];

    (await this.service.getMovies(this.inputValue))
      .subscribe({
        next:(data:MovieInterface) => {
          if (data.Response === 'True') {
            this.movieList = data.Search;
          }
          this.loading = false;
        },
        error: (e) => console.error(e),
      })
  }
}