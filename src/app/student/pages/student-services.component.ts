import { Component, OnInit } from '@angular/core';
import { SidenavItem } from '@core/models/sidenav-item.model';

@Component({
  selector: 'app-student-services',
  templateUrl: './student-services.component.html',
  styleUrls: ['./student-services.component.scss'],
})
export class StudentServicesComponent implements OnInit {
  items: (SidenavItem | '-')[] = [
    {
      text: 'My subjects',
      link: '/student-services/my-subjects',
    },
    {
      text: 'My info',
      link: '/student-services/my-info',
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
