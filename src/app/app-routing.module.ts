import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'courses',
    // Students will implement loadChildren here
  },
  {
    path: 'auth',
    // Students will implement loadChildren here
  },
  // Students will implement basic routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 