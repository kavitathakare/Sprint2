import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '@shared/directives/base-component';
import { EntityAttribute } from '@core/models/entity-attribute.model';
import { Subject } from '@core/models/subject.model';
import { StudyProgramService } from '@core/services/study-program.service';
import { TeacherService } from '@core/services/teacher.service';
import { SubjectService } from '@core/services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent extends BaseComponent<Subject> implements OnInit {
  title: string = 'Courses';
  name: string = 'subject';
  attributes: EntityAttribute[] = [
    {
      key: 'id',
      name: 'ID',
      type: 'id',
    },
    {
      key: 'title',
      name: 'Name',
      type: 'text',
      required: true,
    },
    {
      key: 'description',
      name: 'Discription',
      type: 'text',
      required: true,
    },
    {
      key: 'body',
      name: 'Body',
      type: 'text',
      required: true,
    }
  ];

  constructor(
    public override dialog: MatDialog,
    public override service: SubjectService,
    public studyProgramService: StudyProgramService,
    public teacherService: TeacherService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getPage(this.tableData);
  }
}
