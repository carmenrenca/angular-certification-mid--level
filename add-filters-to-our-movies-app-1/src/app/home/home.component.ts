import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { HighlightDirective } from '../highlight.directive';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { Movie } from '../model/movie.model';
import { MoviesService } from '../services/movies.service';
import { FavoritesService } from '../services/favorites.service';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HighlightDirective, MovieItemComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected moviesService$ = inject(MoviesService);
  protected favoritesService = inject(FavoritesService);
  protected movies$: Observable<Movie[]> = this.moviesService$.getMovies();

  filter(title: string, year: string) {
    this.movies$ = this.moviesService$.filterMovieList(title, String(year));
  }
}
