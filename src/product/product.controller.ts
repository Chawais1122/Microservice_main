import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { Product } from 'src/entities';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('product_added')
  productAddedEvent(dto: Product) {
    return this.productService.addProduct(dto);
  }

  @EventPattern('product_updated')
  productUpdatedEvent(data: Product) {
    return this.productService.updateProductById(data.id, data);
  }

  @EventPattern('product_deleted')
  productDeletedEvent(productId: number) {
    return this.productService.deleteProductById(productId);
  }
}
