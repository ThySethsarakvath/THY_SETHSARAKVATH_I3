import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from 'src/module/category/category.service';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query('categories')
  categories() {
    return this.categoryService.findAll();
  }

  @Mutation('createCategory')
  async createCategory(
    @Args('name') name: string,
    @Args('description') description: string,
  ) {
    console.log('--- Resolver Start ---');
    const result = await this.categoryService.create({ name, description });
    console.log('--- DB Result ---', result);
    return result;
  }
}
