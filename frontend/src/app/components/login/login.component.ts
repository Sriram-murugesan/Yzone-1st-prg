import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="card">
      <h2>Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            formControlName="email" 
            class="form-control"
            [class.is-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
          <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="text-danger">
            Email is required and must be valid.
          </div>
        </div>
        
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            formControlName="password" 
            class="form-control"
            [class.is-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
          <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="text-danger">
            Password is required.
          </div>
        </div>
        
        <div *ngIf="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary" 
          [disabled]="loginForm.invalid || isLoading">
          <span *ngIf="isLoading">Logging in...</span>
          <span *ngIf="!isLoading">Login</span>
        </button>
      </form>
      
      <p class="mt-3">
        Don't have an account? <a routerLink="/register">Register here</a>
      </p>
    </div>
  `,
  styles: [`
    .mt-3 {
      margin-top: 1rem;
    }
    
    .text-danger {
      color: #dc3545;
      font-size: 0.875em;
      margin-top: 0.25rem;
    }
    
    .is-invalid {
      border-color: #dc3545;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}