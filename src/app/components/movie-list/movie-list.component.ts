import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ImdbResponseItemInterface} from "../../interfaces/imdb-interface";
import {MockApiFormDataInterface} from "../../interfaces/mock-api-interface";
import {MyMoviesAndSeriesService} from "../../services/my-movies-and-series.service";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './movie-list.component.html'
})
export class MovieListComponent {
  @Input() movieList!: ImdbResponseItemInterface[];
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() show = new EventEmitter<string | number>();
  loading: boolean = false;

  constructor(private MyMoviesAndSeriesService: MyMoviesAndSeriesService) {
  }

  showItem(id: string | number):void {
    this.show.emit(id);
  }

  async addToList(item:ImdbResponseItemInterface): Promise<void> {
    const formData:MockApiFormDataInterface = {
      title: item.Title,
      year: item.Year,
      imdbID: item.imdbID,
      type: item.Type,
      watched: false,
      poster: item.Poster,
    };

    this.loading = true;
    (await this.MyMoviesAndSeriesService.create(formData))
      .subscribe({
        next: () => {
          alert('Filme adicionado com sucesso!')
        },
        error: (e) => console.error(e),
        complete: () => this.loading = false,
      })
  }
}
