import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ImdbResponseItemInterface, SaveMovieDataInterface} from "../../interfaces/imdb-interface";
import {MoviesService} from "../../services/movies.service";

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

  constructor(private MovieService: MoviesService) {
  }

  showItem(id: string | number):void {
    this.show.emit(id);
  }

  async addToList(item:ImdbResponseItemInterface): Promise<void> {
    const formData = {
      title: item.Title,
      year: item.Year,
      imdbID: item.imdbID,
      type: item.Type,
      watched: false,
      poster: item.Poster,
    };

    this.loading = true;
    (await this.MovieService.saveMovie(formData))
      .subscribe({
        next: () => {
          alert('Filme adicionado com sucesso!')
        },
        error: (e) => console.error(e),
        complete: () => this.loading = false,
      })
  }
}
