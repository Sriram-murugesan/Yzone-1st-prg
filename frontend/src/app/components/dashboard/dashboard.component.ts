import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DecisionService } from '../../services/decision.service';
import { Decision } from '../../models/decision.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <div class="header">
        <h2>Decision Dashboard</h2>
        <button class="btn btn-primary" (click)="createDecision()">Create New Decision</button>
      </div>
      
      <div class="stats">
        <div class="stat-card">
          <h3>Total Decisions</h3>
          <p class="stat-value">{{ totalDecisions }}</p>
        </div>
        <div class="stat-card">
          <h3>Outcomes Recorded</h3>
          <p class="stat-value">{{ outcomesRecorded }}</p>
        </div>
        <div class="stat-card">
          <h3>AI Analyses</h3>
          <p class="stat-value">{{ aiAnalyses }}</p>
        </div>
      </div>
      
      <div class="recent-decisions">
        <h3>Recent Decisions</h3>
        <div *ngIf="loading" class="text-center">Loading decisions...</div>
        
        <div *ngIf="!loading && decisions.length === 0" class="no-decisions">
          <p>No decisions recorded yet.</p>
          <button class="btn btn-primary" (click)="createDecision()">Create Your First Decision</button>
        </div>
        
        <div *ngIf="!loading && decisions.length > 0" class="decision-list">
          <div 
            *ngFor="let decision of decisions" 
            class="decision-card"
            (click)="viewDecision(decision._id!)">
            <h4>{{ decision.title }}</h4>
            <p class="decision-date">{{ decision.createdAt | date:'short' }}</p>
            
            <div class="decision-status">
              <span 
                class="status-badge" 
                [class.pending]="!decision.actualOutcome"
                [class.completed]="decision.actualOutcome">
                {{ decision.actualOutcome ? 'Completed' : 'Pending Outcome' }}
              </span>
              
              <span 
                *ngIf="decision.actualOutcome" 
                class="status-badge analyzed"
                [class.analyzed]="decision.aiAnalysis">
                {{ decision.aiAnalysis ? 'Analyzed' : 'Not Analyzed' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .stat-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      text-align: center;
    }
    
    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: #007bff;
      margin: 0;
    }
    
    .decision-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .decision-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .decision-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    .decision-card h4 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }
    
    .decision-date {
      color: #666;
      font-size: 0.875rem;
      margin: 0 0 1rem 0;
    }
    
    .decision-status {
      display: flex;
      gap: 0.5rem;
    }
    
    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: bold;
    }
    
    .pending {
      background-color: #fff3cd;
      color: #856404;
    }
    
    .completed {
      background-color: #d4edda;
      color: #155724;
    }
    
    .analyzed {
      background-color: #cce5ff;
      color: #004085;
    }
    
    .no-decisions {
      text-align: center;
      padding: 2rem;
    }
    
    .text-center {
      text-align: center;
    }
  `]
})
export class DashboardComponent implements OnInit {
  decisions: Decision[] = [];
  totalDecisions = 0;
  outcomesRecorded = 0;
  aiAnalyses = 0;
  loading = true;

  constructor(
    private decisionService: DecisionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDecisions();
  }

  loadDecisions(): void {
    this.decisionService.getDecisions().subscribe({
      next: (decisions: Decision[]) => {
        this.decisions = decisions;
        this.totalDecisions = decisions.length;
        this.outcomesRecorded = decisions.filter(d => d.actualOutcome).length;
        this.aiAnalyses = decisions.filter(d => d.aiAnalysis).length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load decisions', error);
        this.loading = false;
      }
    });
  }

  createDecision(): void {
    this.router.navigate(['/decisions/new']);
  }

  viewDecision(id: string): void {
    this.router.navigate(['/decisions', id]);
  }
}