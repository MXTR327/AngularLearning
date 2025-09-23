import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/paginations/pagination.component';
import { PaginationService } from '@shared/components/paginations/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent
{
  paginationService = inject(PaginationService);
  productsService = inject(ProductsService);

  productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) =>
    {
      return this.productsService.getProducts({
        offset: params.page * 9,
      });
    },
  });
}
