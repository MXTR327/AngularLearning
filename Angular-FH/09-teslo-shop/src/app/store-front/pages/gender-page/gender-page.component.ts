import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/paginations/pagination.component';
import { PaginationService } from '@shared/components/paginations/pagination.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent
{
  private route = inject(ActivatedRoute);
  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));
  paginationService = inject(PaginationService);

  private productsService = inject(ProductsService);

  productsResource = rxResource({
    params: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1,
    }),
    stream: ({ params }) =>
    {
      return this.productsService.getProducts({
        gender: params.gender,
        offset: params.page * 9,
      });
    },
  });
}
