import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { StudentRoutingModule } from './student-routing.module';
import { StudentServicesComponent } from './pages/student-services.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { SubjectEnrollmentComponent } from './pages/subject-enrollment/subject-enrollment.component';
import { InfoComponent } from './pages/info/info.component';

@NgModule({
  declarations: [
    StudentServicesComponent,
    SubjectComponent,
    SubjectEnrollmentComponent,
    InfoComponent,
  ],
  imports: [SharedModule, StudentRoutingModule],
})
export class StudentModule {}
