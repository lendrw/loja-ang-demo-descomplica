import { Routes } from '@angular/router';
import { CourseManagementComponent } from './course-management.component';
import { adminGuard } from '../../core/guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: CourseManagementComponent,
    canActivate: [adminGuard]
  }
]; 