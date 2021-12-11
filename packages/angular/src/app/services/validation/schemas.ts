import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsBoolean,
  ArrayUnique,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

import {
  ID,
  IDs,
  StoryInterface,
  CommentInterface,
} from '@test-task-avito/shared';


const timeLengthMin = 1000000000;
const timeLengthMax = 9999999999;

export class StorySchema implements StoryInterface {
  @IsInt()
    id!: ID;

  @IsString()
  @IsNotEmpty()
    by!: string;

  @IsInt()
  @Min(timeLengthMin)
  @Max(timeLengthMax)
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
  @Max(timeLengthMax)
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

export enum EntityNames  {
  Story = 'Story',
  Comment = 'Comment',
}

export const schemas = {
  [EntityNames.Story]: StorySchema,
  [EntityNames.Comment]: CommentSchema,
};
