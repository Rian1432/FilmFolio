import { Component, OnInit } from '@angular/core';
import {MovieDetails} from "../../interfaces/movie-interface";
import {MoviesService} from "../../services/movies.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DatePipe, NgIf, Location} from "@angular/common";
import {LoaderComponent} from "../../components/loader/loader.component";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    NgIf,
    LoaderComponent
  ],
  templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent implements OnInit{
  public movie:MovieDetails | null = null;
  public movieId:string | number = '';
  public loading:boolean = false;

  constructor(
    private MoviesService: MoviesService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  async getMovieById():Promise<void> {
    this.loading = true;
    this.movie = null;

    (await this.MoviesService.getMovie(this.movieId))
      .subscribe({
        next:(data:MovieDetails) => {
          if (data.Response === 'True') {
            this.movie = data;
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
      this.movieId = params['id'];
      this.getMovieById()
    });
  }
}
