import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-edit-course-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  template: `
    <h2 mat-dialog-title>Editar Curso</h2>
    <mat-dialog-content>
      <form #courseForm="ngForm" class="flex flex-col gap-4">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nome do Curso</mat-label>
          <input matInput [(ngModel)]="course.title" required>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Descrição</mat-label>
          <textarea matInput [(ngModel)]="course.description" name="description" rows="3"></textarea>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Preço</mat-label>
          <input matInput type="number" [(ngModel)]="course.price" name="price" [disabled]="course.isFree">
        </mat-form-field>

        <mat-checkbox [(ngModel)]="course.isFree" name="isFree">
          Curso Gratuito
        </mat-checkbox>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="!courseForm.form.valid"
              (click)="save()">
        Salvar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 400px;
    }
  `]
})
export class EditCourseDialogComponent {
  course: Course;

  constructor(
    public dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { course: Course }
  ) {
    this.course = { ...data.course };
  }

  save() {
    if (this.course.isFree) {
      this.course.price = 0;
    }
    this.dialogRef.close(this.course);
  }
} 