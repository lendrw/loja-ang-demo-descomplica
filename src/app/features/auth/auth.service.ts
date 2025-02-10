import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, LoginCredentials, RegisterData, AuthResponse } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredAuth();
  }

  private loadStoredAuth(): void {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      this.currentUserSubject.next(JSON.parse(storedUser));
      this.tokenSubject.next(storedToken);
    }
  }

  login(credentials: LoginCredentials): Observable<User> {
    // Primeiro, busca o usuário
    return this.http.get<User[]>(`${environment.apiUrl}/users?email=${credentials.email}`).pipe(
      map(users => {
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
        if (!user) {
          throw new Error('Credenciais inválidas');
        }
        
        // Remove a senha antes de enviar
        const { password: _, ...userWithoutPassword } = user;
        
        // Cria o objeto de resposta
        const response: AuthResponse = {
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${user.role}.${Date.now()}`,
          user: userWithoutPassword
        };
        
        this.handleAuthSuccess(response);
        return response.user;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Credenciais inválidas'));
      })
    );
  }

  register(data: RegisterData): Observable<User> {
    if (data.password !== data.confirmPassword) {
      return throwError(() => new Error('As senhas não coincidem'));
    }

    // Primeiro, verifica se já existe um usuário com este email
    return this.http.get<User[]>(`${environment.apiUrl}/users?email=${data.email}`).pipe(
      map(users => {
        if (users && users.length > 0) {
          throw new Error('Email já cadastrado');
        }
        return users;
      }),
      switchMap(() => {
        const newUser: Omit<User, 'id'> = {
          name: data.name,
          email: data.email,
          password: data.password,
          role: 'student',
          enrolledCourses: []
        };

        return this.http.post<User>(`${environment.apiUrl}/users`, newUser).pipe(
          map(user => {
            const { password: _, ...userWithoutPassword } = user;
            const response: AuthResponse = {
              token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${user.role}.${Date.now()}`,
              user: userWithoutPassword
            };
            this.handleAuthSuccess(response);
            return response.user;
          })
        );
      }),
      catchError(error => {
        if (error.message === 'Email já cadastrado') {
          return throwError(() => error);
        }
        return throwError(() => new Error('Falha ao registrar usuário'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null);
  }

  private handleAuthSuccess(response: AuthResponse): void {
    const { user } = response;
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('token', response.token);
    this.currentUserSubject.next(userWithoutPassword);
    this.tokenSubject.next(response.token);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value && !!this.tokenSubject.value;
  }

  getAuthToken(): string | null {
    return this.tokenSubject.value;
  }
} 