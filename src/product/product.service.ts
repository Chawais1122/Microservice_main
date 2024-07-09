import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async addProduct(dto: Product) {
    try {
      const product = await this.productModel.create({
        ...dto,
      });
      return product;
    } catch (error) {
      throw new HttpException(
        'Failed to add the product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProductById(productId: number, dto: Product) {
    try {
      await this.productModel.updateOne(
        { id: productId },
        { $set: { ...dto } },
      );
      return 'Product Updated';
    } catch (error) {
      throw new NotFoundException(`Product doesn't exist!`);
    }
  }

  async deleteProductById(productId: number) {
    try {
      await this.productModel.deleteOne({ id: productId });
      return 'Product deleted';
    } catch (error) {
      throw new NotFoundException(`Product doesn't exist!`);
    }
  }
}
