export type ID = number;
export type IDs = ID[];

export interface BaseEntityInterface {
  id: ID;
  by: string;
  time: number;
  kids?: IDs;
  deleted?: Boolean;
}
