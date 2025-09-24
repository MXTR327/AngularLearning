import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { Product } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';
import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';
import { FormUtils } from '@utils/form-utils';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [
    ProductCarouselComponent,
    ReactiveFormsModule,
    FormErrorLabelComponent,
  ],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit
{
  fb = inject(FormBuilder);

  imageFileList: FileList | undefined = undefined;
  product = input.required<Product>();

  tempImages = signal<string[]>([]);

  imagesToCarrousel = computed(() => [
    ...this.product().images,
    ...this.tempImages(),
  ]);

  productForm = this.fb.group({
    description: ['', Validators.required],
    gender: [
      'men',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
    ],
    images: [['']],
    price: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    stock: [0, [Validators.required, Validators.min(0)]],
    tags: [''],
    title: ['', Validators.required],
  });
  productsService = inject(ProductsService);

  router = inject(Router);

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  wasSaved = signal(false);

  ngOnInit(): void
  {
    this.setFormValue(this.product());
  }

  // Images
  onFilesChanged(event: Event)
  {
    const fileList = (event.target as HTMLInputElement).files;
    this.imageFileList = fileList ?? undefined;

    console.log(fileList);

    const imageUrl = Array.from(fileList ?? []).map(file =>
      URL.createObjectURL(file)
    );

    console.log(imageUrl);

    this.tempImages.set(imageUrl);
  }

  onSizeClicked(size: string)
  {
    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes.includes(size))
    {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    }
    else
    {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes });
  }

  async onSubmit()
  {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.productForm.value;
    const productLike: Partial<Product> = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(formValue as any),
      tags:
        formValue.tags
          ?.toLowerCase()
          .split(',')
          .map(tag => tag.trim()) ?? [],
    };

    if (this.product().id === 'new')
    {
      // crear
      const product = await firstValueFrom(
        this.productsService.createProduct(productLike, this.imageFileList)
      );

      console.log('Producto Creado!!', product);

      this.router.navigate(['/admin/products', product.id]);
    }
    else
    {
      await firstValueFrom(
        this.productsService.updateProduct(
          this.product().id,
          productLike,
          this.imageFileList
        )
      );
    }

    this.wasSaved.set(true);
    setTimeout(() =>
    {
      this.wasSaved.set(false);
    }, 3000);
  }

  setFormValue(formLike: Partial<Product>)
  {
    // this.productForm.patchValue(formLike as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.productForm.reset(this.product() as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',') });
  }
}
