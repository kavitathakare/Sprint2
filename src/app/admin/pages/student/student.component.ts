import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntityAttribute } from '@core/models/entity-attribute.model';
import { Student } from '@core/models/student.model';
import { getUserDisplay } from '@core/models/user.model';
import { getStudyProgramDisplay } from '@core/models/study-program.model';
import { StudentService } from '@core/services/student.service';
import { StudyProgramService } from '@core/services/study-program.service';
import { BaseUserComponent } from '../../directives/base-user-component';
import { UserService } from '@core/services/user.service';
import format from 'xml-formatter';
import { saveAs } from 'file-saver';
import { Validators } from '@angular/forms';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent
  extends BaseUserComponent<Student>
  implements OnInit
{
  title: string = 'Students';
  name: string = 'student';
  attributes: EntityAttribute[] = [
    {
      key: 'id',
      name: 'ID',
      type: 'id',
    },
    {
      key: 'name',
      name: 'Name',
      type: 'name',
      required: true,
    },
    {
      key: 'username',
      name: 'Username',
      type: 'text',
      required: true,
      validators: [Validators.minLength(8)],
      errorMessage: 'Password must be at least 8 characters long',
    },
    {
      key: 'email',
      name: 'Email',
      type: 'text',
      required: true,
    },
    {
      key: 'status',
      name: 'Status',
      type: 'text',
      required: true,
    },
    {
      key: 'type',
      name: 'Type',
      type: 'text',
      required: true,
    },
    {
      key: 'yearOfEnroll',
      name: 'Year of enrollment',
      type: 'number',
      required: true,
      validators: [
        Validators.min(new Date().getFullYear() - 10),
        Validators.max(new Date().getFullYear()),
      ],
      errorMessage: `Year of enrollment must be between ${
        new Date().getFullYear() - 10
      } and ${new Date().getFullYear()}`,
    },
    {
      key: 'studyProgram',
      name: 'Study program',
      type: 'select',
      required: true,
      display: getStudyProgramDisplay,
    }
  ];

  constructor(
    public override dialog: MatDialog,
    public override service: StudentService,
    public override userService: UserService,
    public studyProgramService: StudyProgramService
  ) {
    super(userService);
  }

  ngOnInit(): void {
    this.getPage(this.tableData, environment.baseUrl+`/students`);
    this.getOptions('studyProgram', this.studyProgramService);
  }

  override process(value: any): void {
    if (value.id) {
      value.thesis = this.data.content.find((el: { id: any; }) => el.id === value.id)?.thesis;
    }
    super.process(value);
  }

  exportPdf() {
    this.service.getAllPdf().subscribe((data) => {
      saveAs(data, 'students.pdf');
    });
  }

  exportXml() {
    this.service.getAllXml().subscribe((data) => {
      const blob = new Blob([this.JsontoXML(data)], { type: 'application/xml;charset=UTF-8' });
      saveAs(new Blob([blob]), 'students.xml');
    });
  }

  JsontoXML(obj: any) {
    var xml = '';
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (obj[prop] instanceof Array) {
        for (var array in obj[prop]) {
          xml += "<" + prop + ">";
          xml += this.JsontoXML(new Object(obj[prop][array]));
          xml += "</" + prop + ">";
        }
      } else if (typeof obj[prop] == "object") {
        xml += this.JsontoXML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
  }
}
