import {Component, signal, WritableSignal} from '@angular/core';
import {CellComponent} from './cell/cell.component';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [
    CellComponent
  ],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss'
})
export class FieldComponent {
  public readonly cells:WritableSignal<Player[]> = signal(Array(9).fill(""));
  public nextPlayer:WritableSignal<Player> = signal(Math.random() < 0.5? "X" : "O");
  public winner: WritableSignal<Player | null> = signal(null);
  public move(idx:number){
    if (this.winner() !== null){
      this.cells.set(Array(9).fill(""));
      this.nextPlayer.set(this.winner() === "X"? "O" : "X");
      this.winner.set(null);
      return;
    }
    if (this.cells()[idx] !== ""){
      return;
    }
    this.cells()[idx] = this.nextPlayer();
    if (this.checkVictory()){
      this.winner.set(this.nextPlayer());
      return;
    }
    else if (this.cells().every(item => item !== "")){
      this.winner.set("")
      return;
    }
    this.nextPlayer.set( this.nextPlayer() === "X"? "O" : "X");

  }
  private checkVictory(): boolean {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winningCombinations.some(combination =>
      combination.every(idx => this.cells()[idx] === this.nextPlayer())
    );
  }
}

type Player = "" | "X" | "O";
