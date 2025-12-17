import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DecisionService } from '../../services/decision.service';
import { Decision } from '../../models/decision.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-outcome-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card">
      <h2>Record Actual Outcome</h2>
      <h3>{{ decision?.title }}</h3>
      
      <form [formGroup]="outcomeForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="actualOutcome">What Actually Happened:</label>
          <textarea 
            id="actualOutcome" 
            formControlName="actualOutcome" 
            class="form-control"
            [class.is-invalid]="outcomeForm.get('actualOutcome')?.invalid && outcomeForm.get('actualOutcome')?.touched">
          </textarea>
          <div *ngIf="outcomeForm.get('actualOutcome')?.invalid && outcomeForm.get('actualOutcome')?.touched" class="text-danger">
            Actual outcome is required.
          </div>
        </div>
        
        <div class="form-group">
          <label for="successLevel">Success Level (1-5):</label>
          <select 
            id="successLevel" 
            formControlName="successLevel" 
            class="form-control">
            <option value="">Select success level</option>
            <option value="1">1 - Complete Failure</option>
            <option value="2">2 - Mostly Failed</option>
            <option value="3">3 - Mixed Results</option>
            <option value="4">4 - Mostly Successful</option>
            <option value="5">5 - Complete Success</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Unexpected Factors:</label>
          <div formArrayName="unexpectedFactors">
            <div *ngFor="let factor of unexpectedFactors.controls; let i = index" class="mb-2">
              <div class="input-group">
                <input 
                  type="text" 
                  class="form-control" 
                  [formControlName]="i"
                  placeholder="Enter unexpected factor">
                <button 
                  type="button" 
                  class="btn btn-secondary" 
                  (click)="removeFactor(i)">
                  Remove
                </button>
              </div>
            </div>
            <button 
              type="button" 
              class="btn btn-secondary" 
              (click)="addFactor()">
              Add Unexpected Factor
            </button>
          </div>
        </div>
        
        <div *ngIf="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary" 
          [disabled]="outcomeForm.invalid || isLoading">
          <span *ngIf="isLoading">Saving...</span>
          <span *ngIf="!isLoading">Save Outcome</span>
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
export class OutcomeFormComponent implements OnInit {
  outcomeForm!: FormGroup;
  decision: Decision | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private decisionService: DecisionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.outcomeForm = this.fb.group({
      actualOutcome: ['', [Validators.required]],
      successLevel: [''],
      unexpectedFactors: this.fb.array([])
    });
    
    // Load decision data
    const decisionId = this.route.snapshot.paramMap.get('id');
    if (decisionId) {
      this.loadDecision(decisionId);
    }
  }

  loadDecision(id: string): void {
    this.decisionService.getDecision(id).subscribe({
      next: (decision: Decision) => {
        this.decision = decision;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load decision data.';
        console.error(error);
      }
    });
  }

  get unexpectedFactors(): FormArray {
    return this.outcomeForm.get('unexpectedFactors') as FormArray;
  }

  addFactor(): void {
    this.unexpectedFactors.push(this.fb.control(''));
  }

  removeFactor(index: number): void {
    this.unexpectedFactors.removeAt(index);
  }

  onSubmit(): void {
    if (this.outcomeForm.valid && this.decision?._id) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const outcomeData = this.outcomeForm.value;
      
      this.decisionService.updateOutcome(this.decision._id, outcomeData).subscribe({
        next: (decision: Decision) => {
          this.isLoading = false;
          this.router.navigate(['/decisions', decision._id]);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to save outcome. Please try again.';
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.outcomeForm.controls).forEach(key => {
        const control = this.outcomeForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    if (this.decision?._id) {
      this.router.navigate(['/decisions', this.decision._id]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}