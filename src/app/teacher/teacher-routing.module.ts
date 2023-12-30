import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherServicesComponent } from './pages/teacher-services.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { StudentComponent } from './pages/student/student.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherServicesComponent,
    children: [
      {
        path: '',
        redirectTo: '/teacher-services/my-subjects',
        pathMatch: 'full',
      },
      {
        path: 'my-subjects',
        component: SubjectComponent,
      },
      {
        path: 'students',
        component: StudentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
