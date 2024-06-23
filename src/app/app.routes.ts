import { Routes } from '@angular/router';
import {ShowsComponent} from "./pages/shows/shows.component";
import {MoviesComponent} from "./pages/movies/movies.component";
import {MyMoviesComponent} from "./pages/my-movies/my-movies.component";
import {MovieDetailsComponent} from "./pages/movie-details/movie-details.component";
import {permissionGuard} from "./guards/permission.guard";

export const routes: Routes = [
  {path: 'filmes', canActivateChild: [permissionGuard],
    children: [
      {path: '', component: MoviesComponent},
      {path: ':id', component: MovieDetailsComponent},
    ]
  },
  {path: 'series', component: ShowsComponent},
  {path: 'meus-filmes', component: MyMoviesComponent},
  { path: '',   redirectTo: '/filmes', pathMatch: 'full' }
];
