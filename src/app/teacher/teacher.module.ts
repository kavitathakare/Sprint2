import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherServicesComponent } from './pages/teacher-services.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { StudentComponent } from './pages/student/student.component';

@NgModule({
  declarations: [
    TeacherServicesComponent,
    SubjectComponent,
    StudentComponent
  ],
  imports: [SharedModule, TeacherRoutingModule],
})
export class TeacherModule {}
