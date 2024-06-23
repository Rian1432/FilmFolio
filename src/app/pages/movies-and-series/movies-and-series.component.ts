import { Component } from '@angular/core';
import {ImdbResponseInterface, ImdbResponseItemInterface} from "../../interfaces/imdb-interface";
import {debounce} from "lodash";
import {Router} from "@angular/router";
import {LoaderComponent} from "../../components/loader/loader.component";
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShowListComponent} from "../../components/show-list/show-list.component";
import {MoviesAndSeriesService} from "../../services/movies-and-series.service";

@Component({
  selector: 'app-movies-and-series',
  standalone: true,
  imports: [
    LoaderComponent,
    NgIf,
    ReactiveFormsModule,
    ShowListComponent,
    FormsModule
  ],
  templateUrl: './movies-and-series.component.html'
})
export class MoviesAndSeriesComponent {
  public inputValue:string = '';
  public itemList:ImdbResponseItemInterface[] = [];
  public loading:boolean = false;
  public searchData = debounce(this.getMovies, 300);

  constructor(
    private MoviesService: MoviesAndSeriesService,
    private router: Router
  ) {}

  async getMovies():Promise<void> {
    this.loading = true;
    this.itemList = [];

    (await this.MoviesService.index(this.inputValue))
      .subscribe({
        next:(data:ImdbResponseInterface) => {
          if (data.Response === 'True') {
            this.itemList = data.Search;
          }
        },
        error: (e) => console.error(e),
        complete: () => this.loading = false
      })
  }

  showMovie(movieId: string | number):void {
    this.router.navigate([`/filmes-e-series/${movieId}`]);
  }
}
