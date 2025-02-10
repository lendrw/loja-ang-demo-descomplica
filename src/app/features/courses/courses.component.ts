import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';
import * as CartActions from '../cart/cart.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  instructor: string;
  level: string;
  duration: number;
  image: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, SharedModule],
  template: `
    <div class="container">
      <h1>Cursos Disponíveis</h1>
      
      <div class="courses-grid" *ngIf="courses$ | async as courses">
        <mat-card *ngFor="let course of courses" class="course-card" appearance="outlined">
          <img mat-card-image [src]="course.image" [alt]="course.title">
          <mat-card-header>
            <mat-card-title>{{ course.title }}</mat-card-title>
            <mat-card-subtitle>{{ course.instructor }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="description">{{ course.description }}</p>
            <div class="course-details">
              <span class="level" [class]="course.level">
                {{ course.level | titlecase }}
              </span>
              <span class="duration">
                <mat-icon>schedule</mat-icon>
                {{ course.duration }}h
              </span>
            </div>
            <p class="price">R$ {{ course.price | number:'1.2-2' }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" (click)="addToCart(course)" class="action-button">
              <mat-icon>add_shopping_cart</mat-icon>
              <span class="button-text">Adicionar ao Carrinho</span>
            </button>
            <a mat-button color="accent" [routerLink]="['/courses', course.id]" class="action-button">
              <mat-icon>info</mat-icon>
              <span class="button-text">Ver Detalhes</span>
            </a>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 16px;
      max-width: 1400px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      margin-bottom: 24px;
      color: #333;
      font-size: clamp(24px, 4vw, 32px);
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      padding: 8px;
    }

    .course-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s, box-shadow 0.2s;
      margin: 0;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      img {
        height: 200px;
        object-fit: cover;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
    }

    mat-card-header {
      padding: 16px 16px 0;
    }

    mat-card-title {
      font-size: clamp(18px, 3vw, 20px);
      margin-bottom: 8px;
      line-height: 1.3;
    }

    mat-card-content {
      flex-grow: 1;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .description {
        color: #666;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin: 0;
      }
    }

    .course-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    .level {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.9em;
      font-weight: 500;

      &.beginner {
        background-color: #e8f5e9;
        color: #2e7d32;
      }

      &.intermediate {
        background-color: #fff3e0;
        color: #f57c00;
      }

      &.advanced {
        background-color: #fbe9e7;
        color: #d84315;
      }
    }

    .duration {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #666;

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }

    .price {
      font-size: clamp(20px, 4vw, 24px);
      color: #1976d2;
      font-weight: bold;
      margin: 8px 0;
    }

    mat-card-actions {
      display: flex;
      flex-direction: column;
      padding: 16px;
      gap: 8px;
    }

    .action-button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;

      mat-icon {
        margin: 0;
      }

      .button-text {
        white-space: nowrap;
      }
    }

    @media (max-width: 599px) {
      .container {
        padding: 8px;
      }

      .courses-grid {
        grid-template-columns: 1fr;
        gap: 16px;
        padding: 4px;
      }

      .course-card {
        margin: 0;
      }

      mat-card-content {
        padding: 12px;
      }

      .price {
        text-align: center;
      }
    }

    @media (min-width: 600px) and (max-width: 959px) {
      .courses-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 960px) {
      .action-button {
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-2px);
        }
      }
    }
  `]
})
export class CoursesComponent {
  courses$: Observable<Course[]>;

  constructor(
    private http: HttpClient,
    private store: Store,
    private snackBar: MatSnackBar
  ) {
    this.courses$ = this.http.get<Course[]>(`${environment.apiUrl}/courses`);
  }

  addToCart(course: Course): void {
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
  }
} 