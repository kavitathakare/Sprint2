import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntityAttribute } from '@core/models/entity-attribute.model';
import { AuthService } from '@core/services/auth.service';
import { BaseComponent } from '@shared/directives/base-component';
import { TableData } from '@core/models/table-data.model';
import { getSubjectDisplay } from '@core/models/subject.model';

@Component({
  selector: 'app-subject-enrollment',
  templateUrl: './subject-enrollment.component.html',
  styleUrls: ['./subject-enrollment.component.scss'],
})
export class SubjectEnrollmentComponent
  extends BaseComponent<any>
  implements OnInit
{
  title: string = 'Subject enrollments';
  name: string = 'subject enrollment';
  attributes: EntityAttribute[] = [
    {
      key: 'id',
      name: 'ID',
      type: 'id',
    },
    {
      key: 'subject',
      name: 'Subject',
      type: 'skip',
      display: getSubjectDisplay,
    },
    {
      key: 'extraPoints',
      name: 'Extra points',
      type: 'skip',
    },
    {
      key: 'grade',
      name: 'Grade',
      type: 'skip',
    },
  ];

  constructor(
    public override dialog: MatDialog,
    public authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getPage(this.tableData);
  }

  override getPage(data?: TableData) {
    data !== undefined ? (this.tableData = data) : (data = this.tableData);
  }
}
