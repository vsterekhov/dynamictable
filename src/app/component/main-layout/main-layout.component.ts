import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public form: FormGroup;
  public rows$: Observable<any>;
  public cols$: Observable<any>;

  public readonly MAX_RANGE = 100;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      rows: '',
      cols: ''
    });

    this.rows$ = this.form.get('rows').valueChanges
    .pipe(
      startWith(''),
      map(val => this.deleteNaN(val)),
      map(val => this.checkRange(val)),
      map(val => this.rows = val),
      map(val => +val)
    );

    this.cols$ = this.form.get('cols').valueChanges
    .pipe(
      startWith(''),
      map(val => this.deleteNaN(val)),
      map(val => this.checkRange(val)),
      map(val => this.cols = val),
      map(val => +val)
    );
  }

  private deleteNaN(value: string): string {
    return value.replace(/\D/g, '');
  }

  private checkRange(value: string): string {
    return isNaN(+value) || +value <= this.MAX_RANGE ? value : this.checkRange(value.slice(0, -1));
  }

  private set rows(value: string) {
    this.form.get('rows').setValue(value, {emitEvent: false});
  }

  private set cols(value: string) {
    this.form.get('cols').setValue(value, {emitEvent: false});
  }

}
