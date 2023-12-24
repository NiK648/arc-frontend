import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './vendor.component';
import { VendorEmployeesComponent } from './vendor-employees/vendor-employees.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [{ path: '', component: VendorComponent }, {
  path: ':id/employees',
  component: VendorEmployeesComponent,
}, {
  path: ':id/report',
  component: ReportComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
