import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DecisionFormComponent } from './components/decision-form/decision-form.component';
import { OutcomeFormComponent } from './components/outcome-form/outcome-form.component';
import { DecisionDetailComponent } from './components/decision-detail/decision-detail.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'decisions/new', component: DecisionFormComponent, canActivate: [AuthGuard] },
  { path: 'decisions/:id', component: DecisionDetailComponent, canActivate: [AuthGuard] },
  { path: 'decisions/:id/outcome', component: OutcomeFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];