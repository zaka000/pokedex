import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Pokemon } from '../../_model/Pokemon';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  
  getPokemons(limit: number = 10, offset: number = 0): Observable<Pokemon[]> {
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`).pipe(
      map(response => response.results),
      switchMap((pokemons: any[]) => {
        const requests = pokemons.map(pokemon =>
          this.http.get<any>(pokemon.url).pipe(
            map(details => ({
              number: details.id,
              name: details.name,
              types: details.types.map((typeInfo: any) => typeInfo.type.name),
              image: details.sprites.front_default,
              about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            } as Pokemon))
          )
        );
        return forkJoin(requests).pipe(
          map(pokemonList => pokemonList.sort((a, b) => a.number - b.number))
        );
      })
    );
  }
  searchPokemon(name: string): Observable<Pokemon> {
    return this.http.get<any>(`${this.apiUrl}/${name}`).pipe(
      map(details => ({
        number: details.id,
        name: details.name,
        types: details.types.map((typeInfo: any) => typeInfo.type.name),
        image: details.sprites.front_default,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
      } as Pokemon))
    );
  }

}
