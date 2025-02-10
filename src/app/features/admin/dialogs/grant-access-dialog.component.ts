import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AdminService } from '../../../core/services/admin.service';
import { Course } from '../../../core/models/course.model';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-grant-access-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Conceder Acesso a Curso</h2>
    <mat-dialog-content>
      <form #accessForm="ngForm" class="flex flex-col gap-4">
        <mat-form-field>
          <mat-label>Usuário</mat-label>
          <mat-select [(ngModel)]="selectedUserId" name="userId" required>
            <mat-option *ngFor="let user of users" [value]="user.id">
              {{user.name}} ({{user.email}})
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Curso</mat-label>
          <mat-select [(ngModel)]="selectedCourseId" name="courseId" required>
            <mat-option *ngFor="let course of courses" [value]="course.id">
              {{course.title}}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" 
              [disabled]="!accessForm.form.valid"
              (click)="save()">
        Conceder Acesso
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 400px;
    }
  `]
})
export class GrantAccessDialogComponent implements OnInit {
  users: User[] = [];
  courses: Course[] = [];
  selectedUserId?: number;
  selectedCourseId?: number;

  constructor(
    private adminService: AdminService,
    public dialogRef: MatDialogRef<GrantAccessDialogComponent>
  ) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.adminService.getUsers().subscribe(users => this.users = users);
    this.adminService.getCourses().subscribe(courses => this.courses = courses);
  }

  save() {
    if (this.selectedUserId && this.selectedCourseId) {
      this.dialogRef.close({
        userId: this.selectedUserId,
        courseId: this.selectedCourseId
      });
    }
  }
} 