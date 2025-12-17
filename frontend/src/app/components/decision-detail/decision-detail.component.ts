import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DecisionService } from '../../services/decision.service';
import { Decision } from '../../models/decision.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-decision-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card" *ngIf="decision">
      <h2>{{ decision.title }}</h2>
      
      <div class="decision-section">
        <h3>Context</h3>
        <p>{{ decision.context }}</p>
      </div>
      
      <div class="decision-section">
        <h3>Reasoning</h3>
        <p>{{ decision.reasoning }}</p>
      </div>
      
      <div class="decision-section">
        <h3>Assumptions</h3>
        <ul *ngIf="decision.assumptions && decision.assumptions.length > 0">
          <li *ngFor="let assumption of decision.assumptions">{{ assumption }}</li>
        </ul>
        <p *ngIf="!decision.assumptions || decision.assumptions.length === 0">No assumptions recorded.</p>
      </div>
      
      <div class="decision-section">
        <h3>Expected Outcome</h3>
        <p>{{ decision.expectedOutcome }}</p>
      </div>
      
      <div class="decision-section" *ngIf="decision.actualOutcome">
        <h3>Actual Outcome</h3>
        <p>{{ decision.actualOutcome }}</p>
      </div>
      
      <div class="decision-section" *ngIf="decision.successLevel">
        <h3>Success Level</h3>
        <p>
          <span class="success-level" [class]="'level-' + decision.successLevel">
            {{ getSuccessLevelText(decision.successLevel) }}
          </span>
        </p>
      </div>
      
      <div class="decision-section" *ngIf="decision.unexpectedFactors && decision.unexpectedFactors.length > 0">
        <h3>Unexpected Factors</h3>
        <ul>
          <li *ngFor="let factor of decision.unexpectedFactors">{{ factor }}</li>
        </ul>
      </div>
      
      <div class="decision-section" *ngIf="decision.aiAnalysis">
        <h3>AI Analysis</h3>
        
        <div class="analysis-section" *ngIf="decision.aiAnalysis.comparison">
          <h4>Comparison Analysis</h4>
          <p>{{ decision.aiAnalysis.comparison }}</p>
        </div>
        
        <div class="analysis-section" *ngIf="decision.aiAnalysis.invalidAssumptions && decision.aiAnalysis.invalidAssumptions.length > 0">
          <h4>Invalid Assumptions</h4>
          <ul>
            <li *ngFor="let assumption of decision.aiAnalysis.invalidAssumptions">{{ assumption }}</li>
          </ul>
        </div>
        
        <div class="analysis-section" *ngIf="decision.aiAnalysis.lessonsLearned && decision.aiAnalysis.lessonsLearned.length > 0">
          <h4>Lessons Learned</h4>
          <ul>
            <li *ngFor="let lesson of decision.aiAnalysis.lessonsLearned">{{ lesson }}</li>
          </ul>
        </div>
        
        <div class="analysis-section" *ngIf="decision.aiAnalysis.suggestions && decision.aiAnalysis.suggestions.length > 0">
          <h4>Suggestions for Future Decisions</h4>
          <ul>
            <li *ngFor="let suggestion of decision.aiAnalysis.suggestions">{{ suggestion }}</li>
          </ul>
        </div>
      </div>
      
      <div class="actions">
        <button 
          *ngIf="!decision.actualOutcome" 
          class="btn btn-primary" 
          (click)="recordOutcome()">
          Record Actual Outcome
        </button>
        
        <button 
          *ngIf="decision.actualOutcome && !decision.aiAnalysis" 
          class="btn btn-success" 
          (click)="triggerAnalysis()">
          Trigger AI Analysis
        </button>
        
        <button class="btn btn-secondary" (click)="goBack()">Back to Dashboard</button>
      </div>
    </div>
    
    <div *ngIf="!decision && !loading" class="alert alert-danger">
      Decision not found.
    </div>
    
    <div *ngIf="loading" class="text-center">
      Loading...
    </div>
  `,
  styles: [`
    .decision-section {
      margin-bottom: 2rem;
    }
    
    .decision-section h3 {
      border-bottom: 1px solid #eee;
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .analysis-section {
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
    
    .analysis-section h4 {
      margin-top: 0;
    }
    
    .success-level {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-weight: bold;
    }
    
    .level-1 { background-color: #f8d7da; color: #721c24; }
    .level-2 { background-color: #fff3cd; color: #856404; }
    .level-3 { background-color: #cce7ff; color: #004085; }
    .level-4 { background-color: #d4edda; color: #155724; }
    .level-5 { background-color: #d1ecf1; color: #0c5460; }
    
    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }
    
    .text-center {
      text-align: center;
      margin: 2rem 0;
    }
  `]
})
export class DecisionDetailComponent implements OnInit {
  decision: Decision | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private decisionService: DecisionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDecision(id);
    }
  }

  loadDecision(id: string): void {
    this.loading = true;
    this.decisionService.getDecision(id).subscribe({
      next: (decision: Decision) => {
        this.decision = decision;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load decision';
        this.loading = false;
        console.error(error);
      }
    });
  }

  getSuccessLevelText(level: number): string {
    const levels: { [key: number]: string } = {
      1: 'Complete Failure',
      2: 'Mostly Failed',
      3: 'Mixed Results',
      4: 'Mostly Successful',
      5: 'Complete Success'
    };
    return levels[level] || 'Unknown';
  }

  recordOutcome(): void {
    if (this.decision?._id) {
      this.router.navigate(['/decisions', this.decision._id, 'outcome']);
    }
  }

  triggerAnalysis(): void {
    if (this.decision?._id) {
      this.decisionService.analyzeDecision(this.decision._id).subscribe({
        next: (response) => {
          // Reload the decision to get updated analysis
          this.loadDecision(this.decision!._id!);
        },
        error: (error) => {
          console.error('Failed to trigger analysis', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}