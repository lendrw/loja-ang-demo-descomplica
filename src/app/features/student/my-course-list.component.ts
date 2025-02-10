import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface EnrolledCourse {
  id: number;
  title: string;
  description: string;
  instructor: string;
  image: string;
  progress: number;
  lastAccessedModule: string;
  lastAccessedLesson: string;
  modules: {
    title: string;
    completed: boolean;
    lessons: {
      title: string;
      duration: string;
      completed: boolean;
    }[];
  }[];
}

@Component({
  selector: 'app-my-course-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatProgressBarModule
  ],
  template: `
    <div class="my-courses-container">
      <header class="page-header">
        <h1>Meus Cursos</h1>
        <p class="subtitle">Continue de onde parou</p>
      </header>

      <div class="courses-grid" *ngIf="enrolledCourses$ | async as courses">
        <mat-card *ngFor="let course of courses" class="course-card" appearance="outlined">
          <img mat-card-image [src]="course.image" [alt]="course.title">
          
          <mat-card-header>
            <mat-card-title>{{ course.title }}</mat-card-title>
            <mat-card-subtitle>{{ course.instructor }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div class="progress-section">
              <div class="progress-header">
                <span class="progress-label">Seu progresso</span>
                <span class="progress-percentage">{{ course.progress }}%</span>
              </div>
              <mat-progress-bar
                mode="determinate"
                [value]="course.progress"
                [color]="course.progress === 100 ? 'accent' : 'primary'">
              </mat-progress-bar>
            </div>
            
            <div class="last-accessed">
              <mat-icon>play_circle_outline</mat-icon>
              <div class="last-accessed-info">
                <span class="label">Última aula assistida:</span>
                <span class="module">{{ course.lastAccessedModule }}</span>
                <span class="lesson">{{ course.lastAccessedLesson }}</span>
              </div>
            </div>

            <div class="course-stats">
              <div class="stat">
                <mat-icon>book</mat-icon>
                <span>{{ getTotalLessons(course) }} aulas</span>
              </div>
              <div class="stat">
                <mat-icon>check_circle</mat-icon>
                <span>{{ getCompletedLessons(course) }} concluídas</span>
              </div>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <a mat-raised-button color="primary" [routerLink]="['/student/course', course.id, 'learn']">
              <mat-icon>play_circle_filled</mat-icon>
              <span>Continuar Curso</span>
            </a>
            <a mat-button color="accent" [routerLink]="['/courses', course.id]">
              <mat-icon>info</mat-icon>
              <span>Ver Detalhes</span>
            </a>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .my-courses-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
    }

    .page-header {
      text-align: center;
      margin-bottom: 32px;

      h1 {
        font-size: clamp(24px, 4vw, 32px);
        color: #333;
        margin: 0;
      }

      .subtitle {
        color: #666;
        margin-top: 8px;
        font-size: 1.1em;
      }
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }

    .course-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: transform 0.2s, box-shadow 0.2s;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      img {
        height: 180px;
        object-fit: cover;
      }
    }

    mat-card-header {
      padding: 16px 16px 0;
    }

    mat-card-title {
      font-size: 1.2em;
      margin-bottom: 8px;
    }

    mat-card-content {
      padding: 16px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .progress-section {
      .progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;

        .progress-label {
          color: #666;
          font-size: 0.9em;
        }

        .progress-percentage {
          font-weight: 500;
          color: #1976d2;
        }
      }
    }

    .last-accessed {
      display: flex;
      gap: 12px;
      padding: 12px;
      background: rgba(0, 0, 0, 0.04);
      border-radius: 8px;

      mat-icon {
        color: #1976d2;
      }

      .last-accessed-info {
        display: flex;
        flex-direction: column;

        .label {
          font-size: 0.8em;
          color: #666;
        }

        .module {
          font-weight: 500;
          color: #333;
        }

        .lesson {
          font-size: 0.9em;
          color: #666;
        }
      }
    }

    .course-stats {
      display: flex;
      justify-content: space-around;
      padding: 8px 0;

      .stat {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #666;

        mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
        }

        span {
          font-size: 0.9em;
        }
      }
    }

    mat-card-actions {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;

      a {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        mat-icon {
          margin: 0;
        }
      }
    }

    @media (max-width: 599px) {
      .my-courses-container {
        padding: 16px;
      }

      .courses-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }

    @media (min-width: 960px) {
      mat-card-actions a {
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-2px);
        }
      }
    }
  `]
})
export class MyCourseListComponent implements OnInit {
  enrolledCourses$!: Observable<EnrolledCourse[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.enrolledCourses$ = this.http.get<EnrolledCourse[]>(`${environment.apiUrl}/student/courses`);
  }

  getTotalLessons(course: EnrolledCourse): number {
    return course.modules.reduce((total, module) => total + module.lessons.length, 0);
  }

  getCompletedLessons(course: EnrolledCourse): number {
    return course.modules.reduce((total, module) => 
      total + module.lessons.filter(lesson => lesson.completed).length, 0);
  }
} 