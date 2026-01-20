import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/module/category/category.module';
import { ProductModule } from 'src/module/product/product.module';
// import { CategoryResolver } from './resolvers/category.resolver';
// import { ProductResolver } from './resolvers/product.resolver';
import { CategoryCodeFirstResolver } from './resolvers/category.codefirst.resolver';
import { ProductCodeFirstResolver } from './resolvers/product.codefirst.resolver';

@Module({
  imports: [CategoryModule, ProductModule],
  providers: [CategoryCodeFirstResolver, ProductCodeFirstResolver],
})
export class GraphqlModule {}
