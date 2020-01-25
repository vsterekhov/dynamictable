import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  SimpleChange } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent implements OnChanges {
  @Input() rows: number;
  @Input() cols: number;

  public displayedColumns: string[] = [];
  public dataSource: number[][] = [];

  ngOnChanges(sc: SimpleChanges) {
    const scRows: SimpleChange = sc['rows'];
    const scCols: SimpleChange = sc['cols'];

    this.dataSource =
      ( scRows && this.tableChangeHandler(
          scRows,
          this.dataSource,
          this.addRows.bind(this),
          this.delRows.bind(this))
      )
      ||
      ( scCols && this.tableChangeHandler(
          scCols,
          this.dataSource,
          this.addCols.bind(this),
          this.delCols.bind(this))
      )
      ||
      this.dataSource;

    this.displayedColumns =
      ((this.rows === 0 || this.cols === 0) && []) ||
      (scRows && scRows.previousValue === 0 && this.updateHeaders(this.cols)) ||
      (scCols && scCols.currentValue !== scCols.previousValue && this.updateHeaders(scCols.currentValue)) ||
      this.displayedColumns;

  }

  private get randomValue(): number {
    return Math.ceil(Math.random() * 150);
  }

  private tableChangeHandler(
      change: SimpleChange,
      table: number[][],
      add: (change: SimpleChange, table: number[][]) => number [][],
      del: (change: SimpleChange, table: number[][]) => number [][]
    ): number[][] {

    return ( change.previousValue < change.currentValue && add(change, table) ) ||
      ( change.previousValue > change.currentValue && del(change, table) );
  }

  private addRows(change: SimpleChange, table: number[][] = []): number [][] {
    return [
      ...table,
      ...[...Array(+change.currentValue - +change.previousValue)]
        .map(() => [...Array(this.cols)].map( () => this.randomValue) )
      ];
  }

  private delRows(change: SimpleChange, table: number[][] = []): number [][] {
    return [...table].slice(0, +change.currentValue);
  }

  private addCols(change: SimpleChange, table: number[][] = []): number [][] {
    return [...table]
    .map(row => [
      ...row,
      ...[...Array(+change.currentValue - +change.previousValue)].map(() => this.randomValue)
    ]);
  }

  private delCols(change: SimpleChange, table: number[][] = []): number [][] {
    return [...table].map(row => [...row].slice(0, +change.currentValue));
  }

  private updateHeaders(cols: number): string[] {
    return [ 'No', ...[...Array(cols).keys()].map( val => (val + 1).toString()) ];
  }

}
