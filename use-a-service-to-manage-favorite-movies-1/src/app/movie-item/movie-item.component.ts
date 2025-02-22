import { Component, HostBinding, input, output, signal } from '@angular/core';
import { Movie } from '../model/movie.model';
import { MillionDollarPipe } from '../pipes/million-dollar.pipe';
import { MinToDurationPipe } from '../pipes/min-to-duration.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-movie-item',
  host: {},
  template: `
    <div class="movie-item">
      <div>
        <h4>
          <span
            (click)="toggleFavorite(!isFavourite())"
            class="icon-star"
            [ngClass]="isFavourite() ? 'active' : ''"
          ></span>
          {{ movie().title }}
        </h4>
        <small class="subtitle">
          <span>Release date: {{ movie().release_date }}</span>
          <span>Budget: {{ movie().budget | millionDollar }} </span>
          <span>Duration: {{ movie().duration | minToDuration }}</span>
        </small>
      </div>

      <button>Details</button>
    </div>
  `,
  standalone: true,
  imports: [MillionDollarPipe, MinToDurationPipe, NgClass],
  styleUrls: ['movie-item.component.scss'],
})
export class MovieItemComponent {
  movie = input.required<Movie>();
  onFavourite = output<boolean>();
  isFavourite = input<boolean>();

  toggleFavorite(isFavourite: boolean) {
    this.onFavourite.emit(isFavourite);
  }
}
