import { Routes } from '@angular/router';
import {MyMoviesComponent} from "./pages/my-movies/my-movies.component";
import {ItemDetailsComponent} from "./pages/item-details/item-details.component";
import {MoviesAndSeriesComponent} from "./pages/movies-and-series/movies-and-series.component";
import {permissionGuard} from "./guards/permission.guard";

export const routes: Routes = [
  {path: 'filmes-e-series', canActivateChild: [permissionGuard],
    children: [
      {path: '', component: MoviesAndSeriesComponent},
      {path: ':id', component: ItemDetailsComponent},
    ]
  },
  {path: 'meus-filmes', component: MyMoviesComponent},
  { path: '',   redirectTo: '/filmes-e-series', pathMatch: 'full' }
];
