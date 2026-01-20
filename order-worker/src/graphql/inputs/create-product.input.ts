import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsString, IsNumber, IsUUID, Min, MinLength } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0.01)
  price: number;

  @Field()
  @IsString()
  sku: string;

  @Field(() => ID)
  @IsUUID()
  categoryId: string;
}
