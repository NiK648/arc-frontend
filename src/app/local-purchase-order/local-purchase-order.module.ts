import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalPurchaseOrderRoutingModule } from './local-purchase-order-routing.module';
import { LocalPurchaseOrderComponent } from './local-purchase-order.component';


@NgModule({
  declarations: [
    LocalPurchaseOrderComponent
  ],
  imports: [
    CommonModule,
    LocalPurchaseOrderRoutingModule
  ]
})
export class LocalPurchaseOrderModule { }
