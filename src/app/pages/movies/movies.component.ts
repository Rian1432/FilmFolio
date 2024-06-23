import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MoviesService} from "../../services/movies.service";
import {NgForOf, NgIf} from "@angular/common";
import {ImdbResponseInterface, ImdbResponseItemInterface} from "../../interfaces/imdb-interface";
import {LoaderComponent} from "../../components/loader/loader.component";
import { debounce } from "lodash";
import {MovieListComponent} from "../../components/movie-list/movie-list.component";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    NgForOf,
    NgIf,
    LoaderComponent,
    RouterLink,
    RouterLinkActive,
    MovieListComponent
  ],
  templateUrl: './movies.component.html',
})
export class MoviesComponent {
  public inputValue:string = '';
  public movieList:ImdbResponseItemInterface[] = [];
  public loading:boolean = false;
  public searchForMovies = debounce(this.getMovies, 300);

  constructor(
    private MoviesService: MoviesService,
    private router: Router
  ) {}

  async getMovies():Promise<void> {
    this.loading = true;
    this.movieList = [];

    (await this.MoviesService.index(this.inputValue))
      .subscribe({
        next:(data:ImdbResponseInterface) => {
          if (data.Response === 'True') {
            this.movieList = data.Search;
          }
        },
        error: (e) => console.error(e),
        complete: () => this.loading = false
      })
  }

  showMovie(movieId: string | number):void {
    this.router.navigate([`/filmes/${movieId}`]);
  }
}
