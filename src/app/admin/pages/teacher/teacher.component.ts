import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntityAttribute } from '@core/models/entity-attribute.model';
import { Teacher } from '@core/models/teacher.model';
import { TeacherService } from '@core/services/teacher.service';
import { UserService } from '@core/services/user.service';
import { BaseUserComponent } from '../../directives/base-user-component';
import format from 'xml-formatter';
import { saveAs } from 'file-saver';
import { Validators } from '@angular/forms';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent
  extends BaseUserComponent<Teacher>
  implements OnInit
{
  title: string = 'Teachers';
  name: string = 'teacher';
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
      key: 'yearOfEnrollment',
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
    }
  ];

  constructor(
    public override dialog: MatDialog,
    public override service: TeacherService,
    public override userService: UserService
  ) {
    super(userService);
  }

  ngOnInit(): void {
    this.getPage(this.tableData, environment.baseUrl + '/teachers');
  }

  exportPdf() {
    this.service.getAllPdf().subscribe((data) => {
      saveAs(data, 'teachers.pdf');
    });
  }

  exportXml() {
    this.service.getAllXml().subscribe((data) => {
      saveAs(new Blob([format(data)]), 'teachers.xml');
    });
  }
}
