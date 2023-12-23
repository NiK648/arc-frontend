import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalPurchaseOrderComponent } from './local-purchase-order.component';

const routes: Routes = [{ path: '', component: LocalPurchaseOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalPurchaseOrderRoutingModule { }
