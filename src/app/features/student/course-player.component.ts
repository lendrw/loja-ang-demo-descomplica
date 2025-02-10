import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface CourseContent {
  id: number;
  title: string;
  modules: {
    id: number;
    title: string;
    lessons: {
      id: number;
      title: string;
      duration: string;
      videoUrl: string;
      completed: boolean;
    }[];
  }[];
  currentModule: number;
  currentLesson: number;
}

@Component({
  selector: 'app-course-player',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <div class="player-container" *ngIf="courseContent$ | async as course">
      <!-- Sidebar with curriculum -->
      <mat-drawer-container class="player-layout">
        <mat-drawer #drawer mode="side" [opened]="true" class="curriculum-sidebar">
          <div class="curriculum-header">
            <h2>{{ course.title }}</h2>
            <button mat-icon-button (click)="drawer.toggle()">
              <mat-icon>chevron_left</mat-icon>
            </button>
          </div>

          <mat-accordion class="curriculum-list">
            <mat-expansion-panel 
              *ngFor="let module of course.modules; let moduleIndex = index"
              [expanded]="moduleIndex === course.currentModule">
              <mat-expansion-panel-header>
                <mat-panel-title>
                  {{ module.title }}
                </mat-panel-title>
              </mat-expansion-panel-header>

              <mat-nav-list>
                <a mat-list-item 
                  *ngFor="let lesson of module.lessons; let lessonIndex = index"
                  (click)="selectLesson(moduleIndex, lessonIndex)"
                  [class.active]="moduleIndex === course.currentModule && lessonIndex === course.currentLesson"
                  [class.completed]="lesson.completed">
                  <div class="lesson-item">
                    <div class="lesson-info">
                      <mat-icon class="lesson-status">
                        {{ lesson.completed ? 'check_circle' : 'play_circle_outline' }}
                      </mat-icon>
                      <span class="lesson-title">{{ lesson.title }}</span>
                    </div>
                    <span class="lesson-duration">{{ lesson.duration }}</span>
                  </div>
                </a>
              </mat-nav-list>
            </mat-expansion-panel>
          </mat-accordion>
        </mat-drawer>

        <!-- Main content area -->
        <mat-drawer-content class="content-area">
          <div class="video-container">
            <div class="video-header">
              <button mat-icon-button (click)="drawer.toggle()" class="menu-toggle">
                <mat-icon>menu</mat-icon>
              </button>
              <div class="current-lesson-info">
                <h3>{{ getCurrentModule(course).title }}</h3>
                <h4>{{ getCurrentLesson(course).title }}</h4>
              </div>
            </div>

            <div class="video-wrapper">
              <iframe
                [src]="getCurrentVideoUrl(course)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            </div>

            <div class="video-controls">
              <button mat-button (click)="previousLesson()" [disabled]="!hasPreviousLesson(course)">
                <mat-icon>skip_previous</mat-icon>
                Anterior
              </button>

              <button mat-raised-button color="primary" (click)="markAsCompleted()">
                <mat-icon>check</mat-icon>
                Marcar como concluída
              </button>

              <button mat-button (click)="nextLesson()" [disabled]="!hasNextLesson(course)">
                Próxima
                <mat-icon>skip_next</mat-icon>
              </button>
            </div>
          </div>
        </mat-drawer-content>
      </mat-drawer-container>
    </div>
  `,
  styles: [`
    .player-container {
      height: calc(100vh - 64px);
      overflow: hidden;
    }

    .player-layout {
      height: 100%;
    }

    .curriculum-sidebar {
      width: 320px;
      background: #f5f5f5;
    }

    .curriculum-header {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      border-bottom: 1px solid #e0e0e0;

      h2 {
        margin: 0;
        font-size: 1.2em;
        font-weight: 500;
      }
    }

    .curriculum-list {
      .mat-expansion-panel {
        border-radius: 0;
        box-shadow: none;
      }

      .lesson-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .lesson-info {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .lesson-status {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .lesson-title {
        font-size: 0.9em;
      }

      .lesson-duration {
        font-size: 0.8em;
        color: #666;
      }

      a.active {
        background: rgba(25, 118, 210, 0.12);
        color: #1976d2;

        .lesson-duration {
          color: #1976d2;
        }
      }

      a.completed {
        .lesson-status {
          color: #4caf50;
        }
      }
    }

    .content-area {
      background: #fff;
    }

    .video-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .video-header {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      border-bottom: 1px solid #e0e0e0;

      .current-lesson-info {
        h3, h4 {
          margin: 0;
        }

        h3 {
          font-size: 1em;
          color: #666;
        }

        h4 {
          font-size: 1.2em;
          font-weight: 500;
        }
      }
    }

    .video-wrapper {
      flex: 1;
      background: #000;
      position: relative;
      
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .video-controls {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #e0e0e0;

      button {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    @media (max-width: 959px) {
      .curriculum-sidebar {
        width: 280px;
      }
    }

    @media (max-width: 599px) {
      .player-container {
        height: calc(100vh - 56px);
      }

      .curriculum-sidebar {
        width: 100%;
      }

      .video-wrapper {
        height: 0;
        padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
      }

      .video-controls {
        flex-direction: column;
        gap: 8px;

        button {
          width: 100%;
          justify-content: center;
        }
      }
    }
  `]
})
export class CoursePlayerComponent implements OnInit {
  courseContent$!: Observable<CourseContent>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    this.courseContent$ = this.http.get<CourseContent>(`${environment.apiUrl}/student/courses/${courseId}/content`);
  }

  getCurrentModule(course: CourseContent) {
    return course.modules[course.currentModule];
  }

  getCurrentLesson(course: CourseContent) {
    const currentModule = this.getCurrentModule(course);
    return currentModule?.lessons[course.currentLesson];
  }

  getCurrentVideoUrl(course: CourseContent): SafeResourceUrl {
    const lesson = this.getCurrentLesson(course);
    return lesson ? this.sanitizer.bypassSecurityTrustResourceUrl(lesson.videoUrl) : '';
  }

  selectLesson(moduleIndex: number, lessonIndex: number) {
    // Update current lesson in the backend
    const courseId = this.route.snapshot.paramMap.get('id');
    this.http.post(`${environment.apiUrl}/student/courses/${courseId}/progress`, {
      moduleIndex,
      lessonIndex
    }).subscribe();
  }

  markAsCompleted() {
    const courseId = this.route.snapshot.paramMap.get('id');
    const moduleIndex = this.courseContent$.pipe(map(course => course.currentModule));
    const lessonIndex = this.courseContent$.pipe(map(course => course.currentLesson));

    moduleIndex.subscribe(mIndex => {
      lessonIndex.subscribe(lIndex => {
        this.http.post(`${environment.apiUrl}/student/courses/${courseId}/complete`, {
          moduleIndex: mIndex,
          lessonIndex: lIndex
        }).subscribe();
      });
    });
  }

  hasPreviousLesson(course: CourseContent): boolean {
    if (course.currentLesson > 0) return true;
    return course.currentModule > 0 && course.modules[course.currentModule - 1].lessons.length > 0;
  }

  hasNextLesson(course: CourseContent): boolean {
    const currentModule = course.modules[course.currentModule];
    if (course.currentLesson < currentModule.lessons.length - 1) return true;
    return course.currentModule < course.modules.length - 1;
  }

  previousLesson() {
    const courseId = this.route.snapshot.paramMap.get('id');
    this.courseContent$.subscribe(course => {
      let moduleIndex = course.currentModule;
      let lessonIndex = course.currentLesson;

      if (lessonIndex > 0) {
        lessonIndex--;
      } else if (moduleIndex > 0) {
        moduleIndex--;
        lessonIndex = course.modules[moduleIndex].lessons.length - 1;
      }

      this.selectLesson(moduleIndex, lessonIndex);
    });
  }

  nextLesson() {
    const courseId = this.route.snapshot.paramMap.get('id');
    this.courseContent$.subscribe(course => {
      let moduleIndex = course.currentModule;
      let lessonIndex = course.currentLesson;
      const currentModule = course.modules[moduleIndex];

      if (lessonIndex < currentModule.lessons.length - 1) {
        lessonIndex++;
      } else if (moduleIndex < course.modules.length - 1) {
        moduleIndex++;
        lessonIndex = 0;
      }

      this.selectLesson(moduleIndex, lessonIndex);
    });
  }
} 