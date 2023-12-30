import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentServicesComponent } from './pages/student-services.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { InfoComponent } from './pages/info/info.component';

const routes: Routes = [
  {
    path: '',
    component: StudentServicesComponent,
    children: [
      {
        path: '',
        redirectTo: '/student-services/my-subjects',
        pathMatch: 'full',
      },
      {
        path: 'my-subjects',
        component: SubjectComponent,
      },
      {
        path: 'my-info',
        component: InfoComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
