import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetAllPostsInput {
  @Field({ nullable: true })
  sort?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  subcategory?: string;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number;
}

@InputType()
export class CreateMediaInput {
  @Field()
  url: string;

  @Field()
  type: string;
}

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => [String], { nullable: true })
  categories?: string[];

  @Field(() => [String], { nullable: true })
  subcategories?: string[];

  @Field(() => [CreateMediaInput], { nullable: true })
  media?: CreateMediaInput[];
}

@InputType()
export class MediaInput {
  @Field()
  url: string;

  @Field()
  type: string;
}

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => [String], { nullable: true })
  categories?: string[];

  @Field(() => [String], { nullable: true })
  subcategories?: string[];

  @Field(() => [MediaInput], { nullable: true })
  media?: MediaInput[];
} 