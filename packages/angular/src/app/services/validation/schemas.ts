import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsBoolean,
  ArrayUnique,
  Min,
  IsOptional,
} from 'class-validator';

import {
  ID,
  IDs,
  StoryInterface,
  CommentInterface,
} from '@test-task-avito/shared';


const timeLengthMin = 10000000000;

export class StorySchema implements StoryInterface {
  @IsInt()
    id!: ID;

  @IsString()
  @IsNotEmpty()
    by!: string;

  @IsInt()
  @Min(timeLengthMin)
    time!: number;

  @IsOptional()
  @ArrayUnique()
  @IsInt({ each: true })
    kids?: IDs;

  @IsOptional()
  @IsBoolean()
    deleted?: boolean;

  @IsString()
  @IsNotEmpty()
    title!: string;

  @IsInt()
    score!: number;

  @IsOptional()
  @IsString()
    url?: string;

  @IsOptional()
  @IsString()
    text?: string;
}

export class CommentSchema implements CommentInterface {
  @IsInt()
    id!: ID;

  @IsString()
  @IsNotEmpty()
    by!: string;

  @IsInt()
  @Min(timeLengthMin)
    time!: number;

  @IsOptional()
  @ArrayUnique()
  @IsInt({ each: true })
    kids?: IDs;

  @IsOptional()
  @IsBoolean()
    deleted?: boolean;

  @IsString()
  @IsNotEmpty()
    text!: string;

  @IsOptional()
  @IsInt()
    parent?: ID;
}

export enum ValidationEntities {
  Story = 'Story',
  Comment = 'Comment',
}

export const schemas = {
  [ValidationEntities.Story]: StorySchema,
  [ValidationEntities.Comment]: CommentSchema,
};
