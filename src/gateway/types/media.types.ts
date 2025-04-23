import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Media {
  @Field()
  id: string;

  @Field()
  url: string;

  @Field()
  filename: string;

  @Field()
  mimeType: string;

  @Field()
  size: number;

  @Field()
  userId: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class MediaResponse {
  @Field(() => Media)
  media: Media;
}

@ObjectType()
export class MediaListResponse {
  @Field(() => [Media])
  mediaList: Media[];
}