import { Routes } from '@angular/router';

import { StoreFrontLayoutComponent } from './layouts/store-front-layout/store-front-layout.component';
import { GenderPageComponent } from './pages/gender-page/gender-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const storeFrontRoutes: Routes = [
  {
    children: [
      {
        component: HomePageComponent,
        path: '',
      },
      {
        component: GenderPageComponent,
        path: 'gender/:gender',
      },
      {
        component: ProductPageComponent,
        path: 'product/:idSlug',
      },
      {
        component: NotFoundPageComponent,
        path: '**',
      },
    ],
    component: StoreFrontLayoutComponent,
    path: '',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default storeFrontRoutes;
