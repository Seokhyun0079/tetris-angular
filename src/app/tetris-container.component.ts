import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockType, HEIGHT, WIDTH } from './block.type';

@Component({
  selector: 'tetris-container',
  templateUrl: './tetris-container.component.html',
  styleUrls: ['./tetris-container.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TetrisContainerComponent {
  board: number[][] = [];

  constructor() {

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
}
