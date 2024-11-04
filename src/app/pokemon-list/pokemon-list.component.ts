import { Component } from '@angular/core';
import { Pokemon } from '../../_model/Pokemon';
import { PokemonService } from '../services/pokemon.service';
export { Pokemon };





@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  pokemons: Pokemon[] = [];
  limit = 10;
  offset = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }
  
  loadPokemons(): void {
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe(pokemonList => {
      this.pokemons = pokemonList; 
    });
  }

  searchPokemon(name: string): void {
    if (name) {
      this.pokemonService.searchPokemon(name.toLowerCase()).subscribe(pokemon => {
        this.pokemons = [pokemon];
      });
    } else {
      this.loadPokemons();
      
    }
  }
}

