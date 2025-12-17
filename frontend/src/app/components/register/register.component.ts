import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="card">
      <h2>Register</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            formControlName="username" 
            class="form-control"
            [class.is-invalid]="registerForm.get('username')?.invalid && registerForm.get('username')?.touched">
          <div *ngIf="registerForm.get('username')?.invalid && registerForm.get('username')?.touched" class="text-danger">
            Username is required (3-30 characters).
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            formControlName="email" 
            class="form-control"
            [class.is-invalid]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
          <div *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched" class="text-danger">
            Valid email is required.
          </div>
        </div>
        
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            formControlName="password" 
            class="form-control"
            [class.is-invalid]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
          <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched" class="text-danger">
            Password must be at least 6 characters.
          </div>
        </div>
        
        <div *ngIf="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary" 
          [disabled]="registerForm.invalid || isLoading">
          <span *ngIf="isLoading">Registering...</span>
          <span *ngIf="!isLoading">Register</span>
        </button>
      </form>
      
      <p class="mt-3">
        Already have an account? <a routerLink="/login">Login here</a>
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
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}