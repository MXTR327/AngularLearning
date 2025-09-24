import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ProductTableComponent } from '@products/components/product-table/product-table.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/paginations/pagination.component';
import { PaginationService } from '@shared/components/paginations/pagination.service';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, PaginationComponent, RouterLink],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent
{
  paginationService = inject(PaginationService);

  productsPerPage = signal<number>(10);
  productsService = inject(ProductsService);

  productsResource = rxResource({
    params: () => ({
      limit: this.productsPerPage(),
      page: this.paginationService.currentPage() - 1,
    }),
    stream: ({ params }) =>
    {
      return this.productsService.getProducts({
        limit: params.limit,
        offset: params.page * (this.productsPerPage() - 1),
      });
    },
  });
}
