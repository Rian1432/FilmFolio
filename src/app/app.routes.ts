import { Routes } from '@angular/router';
import {MoviesComponent} from "./pages/movies/movies.component";
import {ShowsComponent} from "./pages/shows/shows.component";
import {MyMoviesComponent} from "./pages/my-movies/my-movies.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {MovieDetailsComponent} from "./pages/movie-details/movie-details.component";

export const routes: Routes = [
  {path: 'filmes',
    children: [
      {path: '', component: MoviesComponent},
      {path: ':id', component: MovieDetailsComponent},
    ]
  },
  {path: 'series', component: ShowsComponent},
  {path: 'meus-filmes', component: MyMoviesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: '',   redirectTo: '/filmes', pathMatch: 'full' }
];
