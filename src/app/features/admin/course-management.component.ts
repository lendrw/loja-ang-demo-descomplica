import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminService, CourseAccess } from '../../core/services/admin.service';
import { Course } from '../../core/models/course.model';
import { User } from '../../core/models/user.model';
import { EditCourseDialogComponent } from './dialogs/edit-course-dialog.component';
import { GrantAccessDialogComponent } from './dialogs/grant-access-dialog.component';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">Gerenciamento de Cursos</h1>
      
      <!-- Lista de Cursos -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Cursos</h2>
        <table mat-table [dataSource]="courses" class="w-full">
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>Nome</th>
            <td mat-cell *matCellDef="let course">{{course.title}}</td>
          </ng-container>

          <ng-container matColumnDef="instructor">
            <th mat-header-cell *matHeaderCellDef>Instrutor</th>
            <td mat-cell *matCellDef="let course">{{course.instructor}}</td>
          </ng-container>

          <ng-container matColumnDef="level">
            <th mat-header-cell *matHeaderCellDef>Nível</th>
            <td mat-cell *matCellDef="let course">{{course.level | titlecase}}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let course">{{course.status}}</td>
          </ng-container>

          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef>Preço</th>
            <td mat-cell *matCellDef="let course">
              {{course.isFree ? 'Gratuito' : (course.price | currency:'BRL')}}
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Ações</th>
            <td mat-cell *matCellDef="let course">
              <button mat-icon-button (click)="editCourse(course)" matTooltip="Editar curso">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button (click)="toggleCourseStatus(course)" 
                      [matTooltip]="course.status === 'available' ? 'Ocultar curso' : 'Mostrar curso'">
                <mat-icon>{{course.status === 'available' ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="['title', 'instructor', 'level', 'status', 'price', 'actions']"></tr>
          <tr mat-row *matRowDef="let row; columns: ['title', 'instructor', 'level', 'status', 'price', 'actions'];"></tr>
        </table>
      </section>

      <!-- Acessos aos Cursos -->
      <section class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Acessos aos Cursos</h2>
          <button mat-raised-button color="primary" (click)="grantNewAccess()">
            <mat-icon>add</mat-icon>
            Conceder Novo Acesso
          </button>
        </div>

        <table mat-table [dataSource]="courseAccess" class="w-full">
          <ng-container matColumnDef="user">
            <th mat-header-cell *matHeaderCellDef>Usuário</th>
            <td mat-cell *matCellDef="let access">
              {{getUserName(access.userId)}}
            </td>
          </ng-container>

          <ng-container matColumnDef="course">
            <th mat-header-cell *matHeaderCellDef>Curso</th>
            <td mat-cell *matCellDef="let access">
              {{getCourseName(access.courseId)}}
            </td>
          </ng-container>

          <ng-container matColumnDef="grantedAt">
            <th mat-header-cell *matHeaderCellDef>Data de Concessão</th>
            <td mat-cell *matCellDef="let access">
              {{access.grantedAt | date:'dd/MM/yyyy HH:mm'}}
            </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let access">
              <span class="status-badge" [class]="access.status">
                {{access.status}}
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Ações</th>
            <td mat-cell *matCellDef="let access">
              <button mat-icon-button (click)="revokeAccess(access)" matTooltip="Revogar acesso">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="['user', 'course', 'grantedAt', 'status', 'actions']"></tr>
          <tr mat-row *matRowDef="let row; columns: ['user', 'course', 'grantedAt', 'status', 'actions'];"></tr>
        </table>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .mat-mdc-table {
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 24px;
    }
    .mat-mdc-row:hover {
      background: rgba(0,0,0,0.04);
    }
    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.9em;
      font-weight: 500;
      text-transform: capitalize;
    }
    .status-badge.active {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    .status-badge.revoked {
      background-color: #ffebee;
      color: #c62828;
    }
  `]
})
export class CourseManagementComponent implements OnInit {
  courses: Course[] = [];
  courseAccess: CourseAccess[] = [];
  users: User[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.adminService.getCourses().subscribe(courses => this.courses = courses);
    this.adminService.getCourseAccess().subscribe(access => this.courseAccess = access);
    this.adminService.getUsers().subscribe(users => this.users = users);
  }

  editCourse(course: Course) {
    const dialogRef = this.dialog.open(EditCourseDialogComponent, {
      data: { course }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.updateCourse(course.id, result).subscribe({
          next: () => {
            Object.assign(course, result);
            this.snackBar.open('Curso atualizado com sucesso!', 'OK', { duration: 3000 });
          },
          error: () => this.snackBar.open('Erro ao atualizar curso', 'OK', { duration: 3000 })
        });
      }
    });
  }

  toggleCourseStatus(course: Course) {
    const newStatus = course.status === 'available' ? 'hidden' : 'available';
    this.adminService.updateCourse(course.id, { status: newStatus }).subscribe({
      next: () => {
        course.status = newStatus;
        this.snackBar.open('Status do curso atualizado com sucesso!', 'OK', { duration: 3000 });
      },
      error: () => this.snackBar.open('Erro ao atualizar status do curso', 'OK', { duration: 3000 })
    });
  }

  grantNewAccess() {
    const dialogRef = this.dialog.open(GrantAccessDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.grantCourseAccess(result.userId, result.courseId).subscribe({
          next: (access) => {
            this.courseAccess.push(access);
            this.snackBar.open('Acesso concedido com sucesso!', 'OK', { duration: 3000 });
          },
          error: () => this.snackBar.open('Erro ao conceder acesso', 'OK', { duration: 3000 })
        });
      }
    });
  }

  revokeAccess(access: CourseAccess) {
    if (confirm('Tem certeza que deseja revogar este acesso?')) {
      this.adminService.revokeCourseAccess(access.id).subscribe({
        next: () => {
          this.courseAccess = this.courseAccess.filter(a => a.id !== access.id);
          this.snackBar.open('Acesso revogado com sucesso!', 'OK', { duration: 3000 });
        },
        error: () => this.snackBar.open('Erro ao revogar acesso', 'OK', { duration: 3000 })
      });
    }
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Usuário não encontrado';
  }

  getCourseName(courseId: number): string {
    const course = this.courses.find(c => c.id === courseId);
    return course ? course.title : 'Curso não encontrado';
  }
} 