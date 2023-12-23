import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'lpo', loadChildren: () => import('./local-purchase-order/local-purchase-order.module').then(m => m.LocalPurchaseOrderModule) },
                    { path: 'quotations', loadChildren: () => import('./quotation/quotation.module').then(m => m.QuotationModule) },
                    { path: 'projects', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
                    { path: 'vendors', loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule) },
                    { path: 'employees', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
                    { path: 'trades', loadChildren: () => import('./trade/trade.module').then(m => m.TradeModule) },
                    { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) },
                    { path: 'rooms', loadChildren: () => import('./room/room.module').then(m => m.RoomModule) },
                    { path: 'clients', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
