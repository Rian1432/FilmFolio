import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SearchInterface} from "../../interfaces/movie-interface";

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
  @Input() movieList!: SearchInterface[];
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() show = new EventEmitter<string | number>();

  showItem(id: string | number):void {
    this.show.emit(id);
  }
}
