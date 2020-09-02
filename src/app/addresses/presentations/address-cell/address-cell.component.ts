import { Address } from './../../model/address.model';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-address-cell',
  templateUrl: './address-cell.component.html',
  styleUrls: ['./address-cell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressCellComponent {
  @Input() value: string;
  @Input() row: Address;
  @Input() prop: string;
  @Input() rowIndex: number;
  @Input() editing: boolean;
  @Output() private updateRow: EventEmitter<{
    rowIndex: number;
    row: Address;
  }> = new EventEmitter();
  @Output() private editModeActivated: EventEmitter<
    undefined
  > = new EventEmitter();
  @Output() private editModeDeactivated: EventEmitter<
    undefined
  > = new EventEmitter();

  public updateValue(newValue: string | number, rowIndex: number): Address {
    let updatedRow = {
      ...this.row,
    };
    updatedRow[this.prop] = newValue;

    this.updateRow.next({
      row: updatedRow,
      rowIndex,
    });

    this.editModeDeactivated.next();

    return updatedRow;
  }
}
