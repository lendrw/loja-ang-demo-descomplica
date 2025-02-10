import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MyCourseListComponent } from './my-course-list.component';
import { CoursePlayerComponent } from './course-player.component';

export const STUDENT_ROUTES: Routes = [
  {
    path: 'my-courses',
    component: MyCourseListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'course/:id/learn',
    component: CoursePlayerComponent,
    canActivate: [AuthGuard]
  }
]; 