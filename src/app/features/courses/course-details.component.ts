import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CartActions from '../cart/cart.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';

interface CourseDetails {
  id: number;
  title: string;
  description: string;
  instructor: string;
  level: string;
  duration: number;
  price: number;
  image: string;
  modules: {
    title: string;
    lessons: {
      title: string;
      duration: string;
    }[];
  }[];
  features: string[];
  requirements: string[];
  objectives: string[];
}

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    SharedModule
  ],
  template: `
    <div class="course-details" *ngIf="course$ | async as course">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="course-info">
            <h1>{{ course.title }}</h1>
            <p class="description">{{ course.description }}</p>
            <div class="meta-info">
              <span class="instructor">
                <mat-icon>person</mat-icon>
                {{ course.instructor }}
              </span>
              <span class="level" [class]="course.level">
                <mat-icon>signal_cellular_alt</mat-icon>
                {{ course.level | titlecase }}
              </span>
              <span class="duration">
                <mat-icon>schedule</mat-icon>
                {{ course.duration }}h
              </span>
            </div>
          </div>
          <div class="course-card">
            <img [src]="course.image" [alt]="course.title">
            <div class="card-content">
              <div class="price">R$ {{ course.price | number:'1.2-2' }}</div>
              <button mat-raised-button color="primary" class="buy-button" (click)="addToCart(course)">
                <mat-icon>shopping_cart</mat-icon>
                Adicionar ao Carrinho
              </button>
              <button mat-stroked-button color="primary" class="preview-button" (click)="previewCourse()">
                <mat-icon>play_circle_outline</mat-icon>
                Aula Demonstrativa
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Course Content -->
      <section class="content">
        <mat-tab-group>
          <!-- Curriculum -->
          <mat-tab label="Conteúdo do Curso">
            <div class="curriculum">
              <mat-accordion>
                <mat-expansion-panel *ngFor="let module of course.modules">
                  <mat-expansion-panel-header>
                    <mat-panel-title>{{ module.title }}</mat-panel-title>
                  </mat-expansion-panel-header>
                  <mat-list>
                    <mat-list-item *ngFor="let lesson of module.lessons">
                      <mat-icon matListItemIcon>play_circle_outline</mat-icon>
                      <div matListItemTitle>{{ lesson.title }}</div>
                      <div matListItemMeta>{{ lesson.duration }}</div>
                    </mat-list-item>
                  </mat-list>
                </mat-expansion-panel>
              </mat-accordion>
            </div>
          </mat-tab>

          <!-- Features -->
          <mat-tab label="O que está incluído">
            <div class="features">
              <mat-list>
                <mat-list-item *ngFor="let feature of course.features">
                  <mat-icon matListItemIcon>check_circle</mat-icon>
                  <div matListItemTitle>{{ feature }}</div>
                </mat-list-item>
              </mat-list>
            </div>
          </mat-tab>

          <!-- Requirements -->
          <mat-tab label="Pré-requisitos">
            <div class="requirements">
              <mat-list>
                <mat-list-item *ngFor="let requirement of course.requirements">
                  <mat-icon matListItemIcon>arrow_right</mat-icon>
                  <div matListItemTitle>{{ requirement }}</div>
                </mat-list-item>
              </mat-list>
            </div>
          </mat-tab>

          <!-- Objectives -->
          <mat-tab label="Objetivos">
            <div class="objectives">
              <mat-list>
                <mat-list-item *ngFor="let objective of course.objectives">
                  <mat-icon matListItemIcon>stars</mat-icon>
                  <div matListItemTitle>{{ objective }}</div>
                </mat-list-item>
              </mat-list>
            </div>
          </mat-tab>
        </mat-tab-group>
      </section>
    </div>
  `,
  styles: [`
    .course-details {
      min-height: 100%;
      background: #f5f5f5;
    }

    .hero {
      background: linear-gradient(to right, #1976d2, #1565c0);
      color: white;
      padding: 48px 24px;
      margin: -16px -16px 0 -16px;
    }

    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: 48px;
      align-items: start;
    }

    .course-info {
      h1 {
        font-size: clamp(24px, 4vw, 36px);
        margin: 0 0 16px 0;
      }

      .description {
        font-size: 18px;
        line-height: 1.6;
        margin-bottom: 24px;
        opacity: 0.9;
      }
    }

    .meta-info {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;

      span {
        display: flex;
        align-items: center;
        gap: 8px;

        mat-icon {
          width: 20px;
          height: 20px;
          font-size: 20px;
        }
      }

      .level {
        padding: 4px 12px;
        border-radius: 16px;
        
        &.beginner {
          background-color: #4caf50;
        }

        &.intermediate {
          background-color: #ff9800;
        }

        &.advanced {
          background-color: #f44336;
        }
      }
    }

    .course-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .card-content {
        padding: 24px;
      }

      .price {
        font-size: 32px;
        font-weight: 500;
        margin-bottom: 24px;
        color: #1976d2;
      }

      button {
        width: 100%;
        margin-bottom: 12px;
        height: 48px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        mat-icon {
          margin: 0;
        }
      }
    }

    .content {
      max-width: 1200px;
      margin: 24px auto;
      padding: 24px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      ::ng-deep {
        .mat-mdc-tab-body-content {
          padding: 24px 0;
        }
      }
    }

    .curriculum {
      mat-expansion-panel {
        margin-bottom: 8px;
      }

      mat-list-item {
        height: 64px;
      }
    }

    @media (max-width: 959px) {
      .hero-content {
        grid-template-columns: 1fr;
      }

      .course-card {
        max-width: 400px;
        margin: 0 auto;
      }
    }

    @media (max-width: 599px) {
      .hero {
        padding: 24px 16px;
      }

      .content {
        padding: 16px;
        margin: 16px;
      }

      .meta-info {
        gap: 16px;
      }
    }
  `]
})
export class CourseDetailsComponent implements OnInit {
  course$!: Observable<CourseDetails>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private store: Store,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    this.course$ = this.http.get<CourseDetails>(`${environment.apiUrl}/courses/${courseId}`);
  }

  addToCart(course: CourseDetails) {
    this.store.dispatch(CartActions.addToCart({
      item: {
        id: course.id,
        title: course.title,
        price: course.price,
        quantity: 1
      }
    }));

    this.snackBar.open('Curso adicionado ao carrinho!', 'OK', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });

    this.router.navigate(['/cart']);
  }

  previewCourse() {
    this.snackBar.open('Funcionalidade em desenvolvimento', 'OK', {
      duration: 3000
    });
  }
} 