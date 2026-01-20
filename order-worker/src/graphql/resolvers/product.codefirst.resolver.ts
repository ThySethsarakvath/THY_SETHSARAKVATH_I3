import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductType } from '../types/product.type';
import { CreateProductInput } from '../inputs/create-product.input';
import { ProductService } from '../../module/product/product.service';
import { CategoryService } from '../../module/category/category.service';
import { CategoryType } from '../types/category.type';

@Resolver(() => ProductType)
export class ProductCodeFirstResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query(() => [ProductType], { name: 'products' })
  async getProducts() {
    return this.productService.findAll();
  }

  @Mutation(() => ProductType)
  async createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.create(input);
  }

  @ResolveField(() => CategoryType, { nullable: true })
  async category(@Parent() product: ProductType) {
    return this.categoryService.findOne(product.categoryId);
  }
}
