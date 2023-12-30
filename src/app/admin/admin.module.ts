import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminPanelComponent } from './pages/admin-panel.component';
import { AdministratorComponent } from './pages/administrator/administrator.component';
import { StudentComponent } from './pages/student/student.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { SubjectComponent } from './pages/subject/subject.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AdministratorComponent,
    StudentComponent,
    TeacherComponent,
    SubjectComponent,
  ],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
