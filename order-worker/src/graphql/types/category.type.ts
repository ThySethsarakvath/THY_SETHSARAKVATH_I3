import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CategoryType {
  @Field(() => ID)
  id: string; // Changed to string for your UUIDs

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
