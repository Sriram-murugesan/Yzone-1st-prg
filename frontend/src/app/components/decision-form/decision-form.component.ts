import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DecisionService } from '../../services/decision.service';
import { Decision } from '../../models/decision.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-decision-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card">
      <h2>Create New Decision</h2>
      <form [formGroup]="decisionForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Decision Title:</label>
          <input 
            type="text" 
            id="title" 
            formControlName="title" 
            class="form-control"
            [class.is-invalid]="decisionForm.get('title')?.invalid && decisionForm.get('title')?.touched">
          <div *ngIf="decisionForm.get('title')?.invalid && decisionForm.get('title')?.touched" class="text-danger">
            Title is required.
          </div>
        </div>
        
        <div class="form-group">
          <label for="context">Context/Description:</label>
          <textarea 
            id="context" 
            formControlName="context" 
            class="form-control"
            [class.is-invalid]="decisionForm.get('context')?.invalid && decisionForm.get('context')?.touched">
          </textarea>
          <div *ngIf="decisionForm.get('context')?.invalid && decisionForm.get('context')?.touched" class="text-danger">
            Context is required.
          </div>
        </div>
        
        <div class="form-group">
          <label for="reasoning">Reasoning Behind Decision:</label>
          <textarea 
            id="reasoning" 
            formControlName="reasoning" 
            class="form-control"
            [class.is-invalid]="decisionForm.get('reasoning')?.invalid && decisionForm.get('reasoning')?.touched">
          </textarea>
          <div *ngIf="decisionForm.get('reasoning')?.invalid && decisionForm.get('reasoning')?.touched" class="text-danger">
            Reasoning is required.
          </div>
        </div>
        
        <div class="form-group">
          <label>Assumptions:</label>
          <div formArrayName="assumptions">
            <div *ngFor="let assumption of assumptions.controls; let i = index" class="mb-2">
              <div class="input-group">
                <input 
                  type="text" 
                  class="form-control" 
                  [formControlName]="i"
                  placeholder="Enter assumption">
                <button 
                  type="button" 
                  class="btn btn-secondary" 
                  (click)="removeAssumption(i)">
                  Remove
                </button>
              </div>
            </div>
            <button 
              type="button" 
              class="btn btn-secondary" 
              (click)="addAssumption()">
              Add Assumption
            </button>
          </div>
        </div>
        
        <div class="form-group">
          <label for="expectedOutcome">Expected Outcome:</label>
          <textarea 
            id="expectedOutcome" 
            formControlName="expectedOutcome" 
            class="form-control"
            [class.is-invalid]="decisionForm.get('expectedOutcome')?.invalid && decisionForm.get('expectedOutcome')?.touched">
          </textarea>
          <div *ngIf="decisionForm.get('expectedOutcome')?.invalid && decisionForm.get('expectedOutcome')?.touched" class="text-danger">
            Expected outcome is required.
          </div>
        </div>
        
        <div *ngIf="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary" 
          [disabled]="decisionForm.invalid || isLoading">
          <span *ngIf="isLoading">Saving...</span>
          <span *ngIf="!isLoading">Save Decision</span>
        </button>
        
        <button 
          type="button" 
          class="btn btn-secondary ml-2" 
          (click)="onCancel()">
          Cancel
        </button>
      </form>
    </div>
  `,
  styles: [`
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    
    .ml-2 {
      margin-left: 0.5rem;
    }
    
    .input-group {
      display: flex;
      gap: 0.5rem;
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
export class DecisionFormComponent implements OnInit {
  decisionForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private decisionService: DecisionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.decisionForm = this.fb.group({
      title: ['', [Validators.required]],
      context: ['', [Validators.required]],
      reasoning: ['', [Validators.required]],
      assumptions: this.fb.array([]),
      expectedOutcome: ['', [Validators.required]]
    });
  }

  get assumptions(): FormArray {
    return this.decisionForm.get('assumptions') as FormArray;
  }

  addAssumption(): void {
    this.assumptions.push(this.fb.control(''));
  }

  removeAssumption(index: number): void {
    this.assumptions.removeAt(index);
  }

  onSubmit(): void {
    if (this.decisionForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const decisionData = this.decisionForm.value;
      
      this.decisionService.createDecision(decisionData).subscribe({
        next: (decision: Decision) => {
          this.isLoading = false;
          this.router.navigate(['/decisions', decision._id]);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to save decision. Please try again.';
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.decisionForm.controls).forEach(key => {
        const control = this.decisionForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}