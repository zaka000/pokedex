import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../app/services/theme.service'; // Importando o serviço de tema

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Pokédex'; 
  pokemons: any; 

  constructor(private router: Router, private themeService: ThemeService) {
    
    this.themeService.theme$.subscribe(isDark => {
      document.body.classList.toggle('theme-dark', isDark);
    });
  }

  goToDetails(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }

  toggleTheme(): void {
    const currentTheme = this.themeService.themeDark; 
    this.themeService.themeDark = !currentTheme; 
  }
    
}