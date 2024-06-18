import { Component } from '@angular/core';
import {FooterComponent} from "../../layout/footer/footer.component";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    FooterComponent,
    FormsModule,
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './movies.component.html',
})
export class MoviesComponent {
  inputValue: string = '';
}
