import { rxResource } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { ProductsService } from '@products/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component( {
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.component.html',
} )
export class ProductPageComponent
{
  activatedRoute = inject( ActivatedRoute );
  productsService = inject( ProductsService );

  productIdSlug: string = this.activatedRoute.snapshot.params[ "idSlug" ];

  productResource = rxResource(
    {
      params: () => ( { idSlug: this.productIdSlug } ),
      stream: ( { params } ) => this.productsService.getProductByIdSlug( params.idSlug ),
    }
  );
}
