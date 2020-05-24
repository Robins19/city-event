import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginModuleModule} from '../app/login-module/login-module.module'
import { ModuleModule } from './module/module.module';
const routes: Routes = [
  {
    path: '',
    loadChildren:'./login-module/login-module.module#LoginModuleModule'
  },
  {
    path: 'dashboard',
    loadChildren:'./module/module.module#ModuleModule'
  },
  { 
    path: '**',
    redirectTo: '/login-module'
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),LoginModuleModule,ModuleModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
