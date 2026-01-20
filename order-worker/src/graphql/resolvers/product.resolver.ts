/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from '../../module/product/product.service';
import { CategoryService } from '../../module/category/category.service';

@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query('products')
  async products() {
    const products = await this.productService.findAll();
    // console.log('Fetched products:', products);
    return products;
  }

  @Query('product')
  async product(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Mutation('createProduct')
  async createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('sku') sku: string,
    @Args('categoryId') categoryId: string,
  ) {
    return this.productService.create({
      name,
      price,
      sku,
      categoryId,
    });
  }

  @ResolveField('category')
  async category(@Parent() product: any) {
    console.log('Resolving category for product:', product.name);
    return this.categoryService.findOne(product.categoryId);
  }
}
