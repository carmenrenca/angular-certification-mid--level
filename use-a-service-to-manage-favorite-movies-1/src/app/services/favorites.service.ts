import { Injectable, signal, WritableSignal } from '@angular/core';
import { Movie } from '../model/movie.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favourites: WritableSignal<Movie[]> = signal([]);
}
