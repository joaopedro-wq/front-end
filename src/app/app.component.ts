import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button class="theme-toggle-button" (click)="toggleTheme()">
      <span *ngIf="isDarkMode" class="material-icons">light_mode</span>
      <span *ngIf="!isDarkMode" class="material-icons">dark_mode</span>
    </button>
    <router-outlet></router-outlet>
  `,

  imports: [RouterModule, CommonModule],
})
export class AppComponent {
  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    console.log('Tema alternado:', this.isDarkMode);
  }
}
