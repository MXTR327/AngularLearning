import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import {
  Gender,
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

const emptyProduct: Product = {
  description: '',
  gender: Gender.Men,
  id: 'new',
  images: [],
  price: 0,
  sizes: [],
  slug: '',
  stock: 0,
  tags: [],
  title: '',
  user: {} as User,
};

@Injectable({ providedIn: 'root' })
export class ProductsService
{
  private http = inject(HttpClient);

  private productCache = new Map<string, Product>();
  private productsCache = new Map<string, ProductsResponse>();

  createProduct(productLike: Partial<Product>): Observable<Product>
  {
    return this.http
      .post<Product>(`${baseUrl}/products`, productLike)
      .pipe(tap(product => this.updateProductCache(product)));
  }

  getProductById(id: string): Observable<Product>
  {
    if (id === 'new')
    {
      return of(emptyProduct);
    }

    if (this.productCache.has(id)) return of(this.productCache.get(id)!);

    return this.http
      .get<Product>(`${baseUrl}/products/${id}`)
      .pipe(tap(product => this.productCache.set(id, product)));
  }

  getProductByIdSlug(idSlug: string): Observable<Product>
  {
    if (this.productCache.has(idSlug))
      return of(this.productCache.get(idSlug)!);

    return this.http
      .get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(tap(product => this.productCache.set(idSlug, product)));
  }

  getProducts(options: Options): Observable<ProductsResponse>
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

  updateProduct(
    id: string,
    productLike: Partial<Product>
  ): Observable<Product>
  {
    return this.http
      .patch<Product>(`${baseUrl}/products/${id}`, productLike)
      .pipe(tap(product => this.updateProductCache(product)));
  }

  updateProductCache(product: Product)
  {
    const productId = product.id;

    this.productCache.set(productId, product);

    this.productsCache.forEach(productResponse =>
    {
      productResponse.products = productResponse.products.map(currentProduct =>
        currentProduct.id === productId ? product : currentProduct
      );
    });
  }
}
