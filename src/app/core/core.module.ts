import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { AdministratorService } from './services/administrator.service';
import { StudentService } from './services/student.service';
import { StudyProgramService } from './services/study-program.service';
import { SubjectService } from './services/subject.service';
import { TeacherService } from './services/teacher.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
    AdministratorService,
    StudentService,
    StudyProgramService,
    SubjectService,
    TeacherService,
    UserService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
