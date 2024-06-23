import { Routes } from '@angular/router';
import {ShowsComponent} from "./pages/shows/shows.component";
import {MoviesComponent} from "./pages/movies/movies.component";
import {MyMoviesComponent} from "./pages/my-movies/my-movies.component";
import {ItemDetailsComponent} from "./pages/item-details/item-details.component";
import {permissionGuard} from "./guards/permission.guard";

export const routes: Routes = [
  {path: 'filmes', canActivateChild: [permissionGuard],
    children: [
      {path: '', component: MoviesComponent},
      {path: ':id', component: ItemDetailsComponent},
    ]
  },
  {path: 'series', component: ShowsComponent},
  {path: 'meus-filmes', component: MyMoviesComponent},
  { path: '',   redirectTo: '/filmes', pathMatch: 'full' }
];
