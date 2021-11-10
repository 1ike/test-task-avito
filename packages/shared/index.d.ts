export type ID = number;
export type IDs = ID[];

export interface BaseEntityInterface {
  id: ID;
  by: string;
  time: number;
  kids?: IDs;
  deleted?: boolean;
}

export interface StoryInterface extends BaseEntityInterface {
  title: string;
  score: number;
  url?: string;
  text?: string;
}

export interface CommentInterface extends BaseEntityInterface {
  text: string;
  parent?: ID;
}
