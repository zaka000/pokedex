import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _themeDark = new BehaviorSubject<boolean>(false);

  private _detectThemeInLocalStorage() {
    const themeUser = localStorage.getItem('themeUser');
    if (themeUser) {
      return themeUser === 'dark';
    }
    return null;
  }

  private _detectUserPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  get theme$(): Observable<boolean> {
    return this._themeDark.asObservable();
  }

  set themeDark(value: boolean | null) {
    if (value === null) {
      localStorage.removeItem('themeUser');
      this._themeDark.next(this._detectUserPreferredTheme());
    } else {
      this._themeDark.next(value);
      localStorage.setItem('themeUser', value ? 'dark' : 'light'); 
    }
  }

  constructor() {
    const isThemeDark = this._detectThemeInLocalStorage() ?? this._detectUserPreferredTheme();
    this._themeDark.next(isThemeDark);

    const body = document.body;
    body.classList.toggle('theme-dark', isThemeDark);

    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      this.themeDark = event.matches; 
      body.classList.toggle('theme-dark', event.matches); 
    });
  }
}