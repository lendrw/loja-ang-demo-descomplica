import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Course } from '../models/course.model';
import { User } from '../models/user.model';

export interface CourseAccess {
  id: number;
  userId: number;
  courseId: number;
  grantedBy: number;
  grantedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Cursos
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/admin/courses`);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.patch<Course>(`${this.apiUrl}/admin/courses/${id}`, course);
  }

  // Acessos aos cursos
  getCourseAccess(): Observable<CourseAccess[]> {
    return this.http.get<CourseAccess[]>(`${this.apiUrl}/admin/course-access`);
  }

  grantCourseAccess(userId: number, courseId: number): Observable<CourseAccess> {
    const access = {
      userId,
      courseId,
      grantedBy: 1, // ID do admin
      grantedAt: new Date().toISOString()
    };
    return this.http.post<CourseAccess>(`${this.apiUrl}/admin/course-access`, access);
  }

  revokeCourseAccess(accessId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/course-access/${accessId}`);
  }

  // Usuários
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/users`);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/admin/users/${id}`, user);
  }
} 