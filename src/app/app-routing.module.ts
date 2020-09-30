import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SelectivePreloadingStrategyService } from './services/selective-preloading-strategy.service';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
    data: { preload: true }, // Utiliza el servicio para Preloading Strategy
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)], // <-- OPTION 1
  // imports: [
  //   // <-- OPTION 2
  //   RouterModule.forRoot(routes, {
  //     enableTracing: false, // <-- debugging purposes only
  //     preloadingStrategy: PreloadAllModules,
  //   }),
  // ],
  imports: [
    // <-- OPTION 3
    RouterModule.forRoot(routes, {
      enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategyService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
