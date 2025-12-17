import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav class="navbar">
      <div class="container">
        <a routerLink="/dashboard" class="navbar-brand">AI Decision Tracker</a>
        <div class="navbar-menu" *ngIf="authService.isAuthenticated()">
          <a routerLink="/dashboard" class="nav-link">Dashboard</a>
          <a routerLink="/decisions/new" class="nav-link">New Decision</a>
          <button class="btn btn-outline" (click)="logout()">Logout</button>
        </div>
      </div>
    </nav>
    
    <div class="container">
      <router-outlet />
    </div>
  `,
  styles: [`
    .navbar {
      background-color: #007bff;
      padding: 1rem 0;
      margin-bottom: 2rem;
    }
    
    .navbar-brand {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
    }
    
    .navbar-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    
    .nav-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .btn-outline {
      background: transparent;
      border: 1px solid white;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .btn-outline:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
  `]
})
export class AppComponent {
  title = 'ai-decision-tracker';
  
  constructor(public authService: AuthService) {}
  
  logout(): void {
    this.authService.logout();
  }
}