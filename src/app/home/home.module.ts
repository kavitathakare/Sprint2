import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FacultiesComponent } from './pages/faculties/faculties.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    FacultiesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
