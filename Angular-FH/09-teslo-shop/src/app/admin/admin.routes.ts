/* eslint-disable perfectionist/sort-objects */
import { Routes } from '@angular/router';
import { IsAdminGuard } from '@auth/guards/is-admin.guard';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductAdminPageComponent } from './pages/product-admin-page/product-admin-page.component';
import { ProductsAdminPageComponent } from './pages/products-admin-page/products-admin-page.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canMatch: [IsAdminGuard],
    children: [
      {
        path: 'products',
        component: ProductsAdminPageComponent,
      },
      {
        path: 'products/:id',
        component: ProductAdminPageComponent,
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];

export default adminRoutes;
