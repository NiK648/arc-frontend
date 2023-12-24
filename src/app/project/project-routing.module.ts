import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ProjectEmployeesComponent } from './project-employees/project-employees.component';

const routes: Routes = [{ path: '', component: ProjectComponent }, {
  path: ':id/employees',
  component: ProjectEmployeesComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
