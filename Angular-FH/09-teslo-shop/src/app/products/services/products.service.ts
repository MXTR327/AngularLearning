import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Product,
  ProductsResponse,
} from '@products/interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

interface Options
{
  gender?: string;
  limit?: number;
  offset?: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService
{
  private http = inject(HttpClient);

  private productCache = new Map<string, Product>();
  private productsCache = new Map<string, ProductsResponse>();

  public getProductByIdSlug(idSlug: string): Observable<Product>
  {
    if (this.productCache.has(idSlug))
      return of(this.productCache.get(idSlug)!);

    return this.http
      .get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(tap(product => this.productCache.set(idSlug, product)));
  }

  public getProducts(options: Options): Observable<ProductsResponse>
  {
    const { gender = '', limit = 9, offset = 0 } = options;

    const key = `${limit}-${offset}-${gender}`; // 9 - 0 - ""
    if (this.productsCache.has(key)) return of(this.productsCache.get(key)!);

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          gender,
          limit,
          offset,
        },
      })
      .pipe(
        tap(resp => console.log(resp)),
        tap(resp => this.productsCache.set(key, resp))
      );
  }
}
