import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';

import { ProductDetailsComponent } from "./product-details/product-details.component";

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetailsComponent],
  templateUrl: './product-admin-page.component.html',
})
export class ProductAdminPageComponent
{
  activatedRoute = inject(ActivatedRoute);

  productId = toSignal(
    this.activatedRoute.params.pipe(map(params => params['id']))
  );

  productsService = inject(ProductsService);

  productResource = rxResource({
    params: () => ({ id: this.productId() }),
    stream: ({ params }) => this.productsService.getProductById(params.id),
  });

  redirectEffect = effect(() =>
  {
    if (this.productResource.error()) this.router.navigate(['/admin/products']);
  });

  router = inject(Router);
}
