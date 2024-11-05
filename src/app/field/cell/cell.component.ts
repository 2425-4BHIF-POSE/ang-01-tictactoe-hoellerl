import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss'
})
export class CellComponent {
  public readonly choice :InputSignal<string> = input.required();
  public readonly index :InputSignal<number> = input.required();
  public readonly onClick : OutputEmitterRef<number> = output();

  public onClickEvent(){
    this.onClick.emit(this.index());
  }


}
