import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MoviesService} from "../../services/movies.service";
import {NgForOf, NgIf} from "@angular/common";
import {MovieInterface, SearchInterface} from "../../interfaces/movie-interface";
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
  public movieList:SearchInterface[] = [];
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
        next:(data:MovieInterface) => {
          if (data.Response === 'True') {
            this.movieList = data.Search;
          }
          this.loading = false;
        },
        error: (e) => console.error(e),
      })
  }

  showMovie(movieId: string | number):void {
    this.router.navigate([`/filmes/${movieId}`]);
  }
}
