export enum BlockType {
  WALL = 3,
  BLOCK = 1,
  STOPED_BLOCK = 2,
  EMPTY = 0,
}

export const WIDTH = 10;
export const HEIGHT = 20;

export type BLOCK_SHAPE = number[][];

export const BLOCKS: { [key: string]: BLOCK_SHAPE } = {
  I: [[1], [1], [1], [1]],
  L: [[1], [1], [1], [1, 1]],
};

export interface Block {
  x: number;
  y: number;
  shape: BLOCK_SHAPE;
  isStop: boolean;
}
