import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TetrisContainerComponent } from './tetris-container.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TetrisContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'tetris-angular';
}
