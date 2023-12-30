import { Component, OnInit } from '@angular/core';
import { SidenavItem } from '@core/models/sidenav-item.model';

@Component({
  selector: 'app-teacher-services',
  templateUrl: './teacher-services.component.html',
  styleUrls: ['./teacher-services.component.scss'],
})
export class TeacherServicesComponent implements OnInit {
  items: (SidenavItem | '-')[] = [
    {
      text: 'My subjects',
      link: '/teacher-services/my-subjects',
    },
    {
      text: 'Students',
      link: '/teacher-services/students',
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
