import {Component, OnInit} from '@angular/core';
import {ImdbItemDetails, ImdbResponseItemInterface} from "../../interfaces/imdb-interface";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DatePipe, Location, NgIf} from "@angular/common";
import {LoaderComponent} from "../../components/loader/loader.component";
import {MoviesAndSeriesService} from "../../services/movies-and-series.service";
import {MockApiFormDataInterface} from "../../interfaces/mock-api-interface";
import {MyMoviesAndSeriesService} from "../../services/my-movies-and-series.service";

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [
    DatePipe,
    LoaderComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './item-details.component.html'
})
export class ItemDetailsComponent implements OnInit{
  public item:ImdbItemDetails | null = null;
  public itemId:string | number = '';
  public loading:boolean = false;

  constructor(
    private MoviesService: MoviesAndSeriesService,
    private MyMoviesAndSeriesService: MyMoviesAndSeriesService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  async getItemById():Promise<void> {
    this.loading = true;
    this.item = null;

    (await this.MoviesService.get(this.itemId))
      .subscribe({
        next:(data:ImdbItemDetails) => {
          if (data.Response === 'True') {
            this.item = data;
          }
          this.loading = false;
        },
        error: (e) => console.error(e),
      })
  }

  async addToMyMoviesAndSeries(item:ImdbResponseItemInterface): Promise<void> {
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
          alert('Adicionado ao Meus Filmes e Séries com sucesso!')
        },
        error: (e) => console.error(e),
        complete: () => this.loading = false,
      })
  }

  backPageHistory() {
    this.location.back()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      this.getItemById()
    });
  }
}
