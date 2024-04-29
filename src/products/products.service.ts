import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  #products: Product[] = [];

  create(createProductDto: CreateProductDto): Product {
    const { name, price, description } = createProductDto;
    const product = new Product(crypto.randomUUID(), name, description, price);

    // Add the product to the list of products
    this.#products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.#products;
  }

  findOne(id: string): Product {
    const product = this.#products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product {
    const { name, price, description } = updateProductDto;
    const product = this.findOne(id);

    product.updateWith({ name, price, description });

    return product;
  }

  remove(id: string): Product {
    const product = structuredClone(this.findOne(id));
    const idx = this.#products.findIndex((product) => product.id === id);
    this.#products.splice(idx, 1);
    return product;
  }
}
