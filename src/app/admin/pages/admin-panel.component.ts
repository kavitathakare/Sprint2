import { Component, OnInit } from '@angular/core';
import { SidenavItem } from '@core/models/sidenav-item.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  items: (SidenavItem | '-')[] = [
     {
      text: 'Students',
      link: '/admin-panel/students',
    },
    {
      text: 'Teachers',
      link: '/admin-panel/teachers',
     },
     {
      text: 'Courses',
      link: '/admin-panel/courses',
     }
  ];

  constructor() {}

  ngOnInit(): void {}
}
