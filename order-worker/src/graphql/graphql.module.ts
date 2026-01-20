import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/module/category/category.module';
import { ProductModule } from 'src/module/product/product.module';
import { CategoryResolver } from './resolvers/category.resolver';
import { ProductResolver } from './resolvers/product.resolver';

@Module({
  imports: [CategoryModule, ProductModule],
  providers: [CategoryResolver, ProductResolver],
})
export class GraphqlModule {}
