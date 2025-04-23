import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './auth.types';

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class Subcategory {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class PostMedia {
  @Field(() => Int)
  id: number;

  @Field()
  url: string;

  @Field()
  type: string;
}

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => [Category], { nullable: true })
  categories?: Category[];

  @Field(() => [Subcategory], { nullable: true })
  subcategories?: Subcategory[];

  @Field(() => [PostMedia], { nullable: true })
  media?: PostMedia[];

  @Field(() => User)
  author: User;

  @Field()
  authorId: string;

  @Field(() => [String], { nullable: true })
  mediaIds?: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class PostResponse {
  @Field(() => Post)
  post: Post;
}

@ObjectType()
export class PostsResponse {
  @Field(() => [Post])
  posts: Post[];

  @Field(() => Int)
  total: number;
} 