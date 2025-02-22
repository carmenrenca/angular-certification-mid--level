import { Component, inject } from '@angular/core';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  standalone: true,

  templateUrl: 'app.component.html',
  imports: [MovieItemComponent],
})
export class AppComponent {
  movieServ = inject(MoviesService);
  movies = this.movieServ.getMovies();
}
