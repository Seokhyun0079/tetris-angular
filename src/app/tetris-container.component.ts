import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Block, BlockType, BLOCK_SHAPE, HEIGHT, WIDTH, BLOCKS } from './block.type';

@Component({
  selector: 'tetris-container',
  templateUrl: './tetris-container.component.html',
  styleUrls: ['./tetris-container.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TetrisContainerComponent {
  board: number[][] = [];
  block: Block = {
    x: WIDTH / 2,
    y: -2,
    shape: BLOCKS['I'],
    isStop: false,
  };
  blockDownInterval: NodeJS.Timeout;

  constructor(private cdr: ChangeDetectorRef) {
    this.initBoard();
    this.blockDownInterval = setInterval(() => {
      this.clearBoard();
      this.selectBlock();
      this.dropBlock();
      this.cdr.detectChanges();
    }, 1000);
  }

  selectBlock() {
    if (this.block.isStop) {
      this.block.shape = BLOCKS['I'];
      this.block.y = 2 - this.block.shape.length;
      this.block.x = WIDTH / 2;
      this.block.isStop = false;
    }
  }

  initBoard() {
    for (let i = 0; i < HEIGHT; i++) {
      const arr: number[] = [];
      for (let j = 0; j < WIDTH; j++) {
        if (i == 0 || i == HEIGHT - 1 || j == 0 || j == WIDTH - 1) {
          arr.push(BlockType.WALL);
        } else {
          arr.push(BlockType.EMPTY);
        }
      }
      this.board.push(arr);
    }
  }

  clearBoard() {
    for (let i = 0; i < HEIGHT - 1; i++) {
      for (let j = 0; j < WIDTH - 1; j++) {
        if (this.block.isStop && this.board[i][j] == BlockType.BLOCK) {
          this.board[i][j] = BlockType.STOPED_BLOCK;
        } else if (i == 0 || i == HEIGHT - 1 || j == 0 || j == WIDTH - 1) {
          this.board[i][j] = BlockType.WALL;
        } else if (this.isAvailable(i, j)) {
          this.board[i][j] = BlockType.EMPTY;
        }
      }
    }
  }

  dropBlock() {
    this.block.shape.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (this.block.y + i < 0) {
          return;
        }
        else if (this.isAvailable(this.block.y + i, this.block.x + j)) {
          this.board[this.block.y + i][this.block.x + j] = BlockType.BLOCK;
        }
      });
    });

    if (this.isAvailable(this.block.y + this.block.shape.length, this.block.x)) {
      this.block.y++;
    } else {
      this.block.isStop = true;
    }
  }

  isAvailable(y: number, x: number) {
    if (this.board[y][x] !== BlockType.WALL && this.board[y][x] !== BlockType.STOPED_BLOCK) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    clearInterval(this.blockDownInterval);
  }
}
