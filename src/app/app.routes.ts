import { Routes } from '@angular/router';
import {MoviesComponent} from "./pages/movies/movies.component";
import {ShowsComponent} from "./pages/shows/shows.component";
import {MyMoviesComponent} from "./pages/my-movies/my-movies.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";

export const routes: Routes = [
  {path: 'movies', component: MoviesComponent},
  {path: 'shows', component: ShowsComponent},
  {path: 'my-movies', component: MyMoviesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: '',   redirectTo: '/movies', pathMatch: 'full' }
];
