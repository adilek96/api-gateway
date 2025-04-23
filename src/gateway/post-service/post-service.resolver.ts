import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostServiceService } from './post-service.service';
import { Post, PostResponse, PostsResponse } from '../types/post.types';
import { CreatePostInput, GetAllPostsInput, UpdatePostInput } from '../types/post-input.types';

@Resolver()
export class PostServiceResolver {
  constructor(private readonly postService: PostServiceService) {}

  @Query(() => [Post])
  async getAllPosts(@Args('filter', { nullable: true }) filter?: GetAllPostsInput) {
    return this.postService.getPosts(filter);
  }

  @Query(() => Post)
  async getPostById(@Args('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Mutation(() => Post)
  async createPost(@Args('data') data: CreatePostInput) {
    return this.postService.createPost(data);
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id') id: string,
    @Args('data') data: UpdatePostInput,
  ) {
    return this.postService.updatePost(id, data);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id') id: string) {
    return this.postService.deletePost(id);
  }
} 