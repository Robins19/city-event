import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AddNewJobComponent } from './add-new-job/add-new-job.component';
import { AgmCoreModule } from '@agm/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SettingComponent } from './setting/setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpiredJobComponent } from './expired-job/expired-job.component';
const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,

  },

  {
    path: 'add-job',
    component: AddNewJobComponent,
  },
  {
    path: 'settings',
    component: SettingComponent,
  },
  {
    path: 'expired-job',
    component: ExpiredJobComponent,
  },


]
@NgModule({
  declarations: [DashboardComponent, HeaderComponent, AddNewJobComponent,SettingComponent, ExpiredJobComponent],
  imports: [
    RouterModule.forChild(dashboardRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYr3S7TR-RUPz5dXqO2RhjgWC9MiiDVW0'


    }),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class ModuleModule { }
