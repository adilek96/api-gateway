import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthServiceService } from './auth-service.service';
import { AuthResponse, User } from '../types/auth.types';

@Resolver()
export class AuthServiceResolver {
  constructor(private readonly authService: AuthServiceService) {}

  @Mutation(() => AuthResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Mutation(() => User)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('confirmPassword') confirmPassword: string,
    @Args('name') name: string,
  ) {
    return this.authService.register({ email, password, confirmPassword, name });
  }

  @Query(() => Boolean)
  async validateToken(@Args('token') token: string) {
    return this.authService.validateToken(token);
  }

  @Query(() => User, { nullable: true })
  async getUser(@Args('id') id: string) {
    return this.authService.getUser(id);
  }

  @Mutation(() => AuthResponse)
  async refreshTokens(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }

  @Mutation(() => Boolean)
  async logout(@Args('token') token: string) {
    return this.authService.logout(token);
  }

  @Mutation(() => AuthResponse)
  async verifyEmail(
    @Args('email') email: string,
    @Args('code') code: string,
  ) {
    return this.authService.verifyEmail(email, code);
  }

  @Mutation(() => AuthResponse)
  async googleAuth(@Args('token') token: string) {
    return this.authService.googleAuth(token);
  }

  @Mutation(() => AuthResponse)
  async facebookAuth(@Args('token') token: string) {
    return this.authService.facebookAuth(token);
  }
} 