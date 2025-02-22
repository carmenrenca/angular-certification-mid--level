import { Component, inject, Signal } from '@angular/core';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { Movie } from './model/movie.model';
import { MoviesService } from './services/movies.service';
import { HighlightDirective } from './highlight.directive';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  standalone: true,

  templateUrl: 'app.component.html',
  imports: [MovieItemComponent, HighlightDirective],
})
export class AppComponent {
  fovoritesServ = inject(FavoritesService);
  protected movies: Signal<Movie[]> = inject(MoviesService).getMovies();

  isFavorite(isFavorite: boolean, movie: Movie) {
    if (isFavorite) {
      this.fovoritesServ.favourites.update((val) => [...val, movie]);
    } else {
      this.fovoritesServ.favourites.update((val) =>
        val.filter((item) => item.id !== movie.id)
      );
    }
  }

  get favouritesIds() {
    return this.fovoritesServ.favourites().map((item) => item.id);
  }
}
