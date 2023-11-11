import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProductRequest, EditProductRequest } from 'api-generated';
import { firstValueFrom } from 'rxjs';
import { ErrorMessageService } from 'src/app/services/error-messages.service';
import { MapperService } from 'src/app/services/mapper.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent {
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected mapperService = inject(MapperService);
  protected errorMessageService = inject(ErrorMessageService);

  protected productId = signal<number>(0);

  protected productForm = new FormGroup({
    id: new FormControl<number | null>(null, Validators.required),
    variantId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    price: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(/^(0|[1-9][0-9]*)$/),
    ]),
    quantity: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(/^(0|[1-9][0-9]*)$/),
    ]),
  });

  protected colors = ['blue', 'black', 'white', 'gray', 'pink'];
  protected types = ['men', 'women', 'accessary'];
  protected response = {
    error: false,
    message: '',
  };

  constructor() {
    this.route.paramMap.subscribe(async (params) => {
      this.productForm.reset();
      this.productForm.enable();
      const id = Number(params.get('id'));
      if (id !== 0) {
        const product = await firstValueFrom(
          this.productsService.getProductById(id)
        );
        this.productForm.patchValue(product);
        this.productForm.controls.id.disable();
        this.productForm.controls.variantId.disable();
        this.productForm.controls.name.disable();
        this.productForm.controls.type.disable();
        this.productForm.controls.color.disable();
        this.productForm.controls.size.disable();
        this.productForm.controls.price.disable();
      } else {
        this.productForm.controls.id.disable();
      }
      this.productId.set(id);
    });
  }

  async onCreate() {
    const formData = this.productForm.getRawValue();
    await firstValueFrom(
      this.productsService.addProduct(formData as AddProductRequest)
    )
      .then((result) => {
        this.response = result;
        setTimeout(() => {
          this.router.navigateByUrl('admin/products');
        }, 2000);
      })
      .catch((error) => {
        this.response.error = true;
        this.response.message = error.message;
      })
      .finally(() => {
        setTimeout(() => {
          this.response.message = '';
        }, 5000);
      });
  }

  async onEdit() {
    const formData = this.productForm.getRawValue();
    await firstValueFrom(
      this.productsService.editProduct(formData as EditProductRequest)
    )
      .then((result) => {
        this.response = result;
      })
      .catch((error) => {
        this.response.error = true;
        this.response.message = error.message;
      })
      .finally(() => {
        setTimeout(() => {
          this.response.message = '';
        }, 5000);
      });
  }

  async onDelete() {
    const id = this.productForm.controls.id.value;
    if (id) {
      await firstValueFrom(this.productsService.deleteProductById(id))
        .then((result) => {
          this.response = result;
          setTimeout(() => {
            this.router.navigateByUrl('admin/products');
          }, 2000);
        })
        .catch((error) => {
          this.response.error = true;
          this.response.message = error.message;
        })
        .finally(() => {
          setTimeout(() => {
            this.response.message = '';
          }, 5000);
        });
    }
  }
}
