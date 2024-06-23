import {Component, OnInit} from '@angular/core';
import {ImdbItemDetails} from "../../interfaces/imdb-interface";
import {ActivatedRoute} from "@angular/router";
import {DatePipe, Location, NgIf} from "@angular/common";
import {LoaderComponent} from "../../components/loader/loader.component";
import {MoviesService} from "../../services/movies.service";

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [
    DatePipe,
    LoaderComponent,
    NgIf
  ],
  templateUrl: './item-details.component.html'
})
export class ItemDetailsComponent implements OnInit{
  public item:ImdbItemDetails | null = null;
  public itemId:string | number = '';
  public loading:boolean = false;

  constructor(
    private MoviesService: MoviesService,
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
