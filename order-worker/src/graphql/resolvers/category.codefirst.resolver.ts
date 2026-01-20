import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from '../../module/category/category.service';
import { CategoryType } from '../types/category.type'; // Import the Type class you created in Part B

@Resolver(() => CategoryType) // 👈 Changed from 'Category' to () => CategoryType
export class CategoryCodeFirstResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryType]) // 👈 This was likely @Query('categories') before
  async categories() {
    return this.categoryService.findAll();
  }

  @Mutation(() => CategoryType)
  async createCategory(
    @Args('name') name: string,
    @Args('description', { nullable: true }) description?: string,
  ) {
    return this.categoryService.create({ name, description });
  }
}
