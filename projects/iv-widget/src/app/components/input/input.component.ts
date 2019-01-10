import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl
} from '@angular/forms';

@Component({
  selector: 'ivw-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => InputComponent),
    //   multi: true
    // }
  ]
})
export class InputComponent implements ControlValueAccessor {
  public disabled = false;

  constructor(private ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  @Input()
  label: string;

  private _value = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  @Input('value')
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  inputChanged(event) {
    this.value = event.target.value;
  }

  public hasError(error?: string) {
    if (error) {
      return this.ngControl.hasError(error) && this.ngControl.touched;
    } else {
      return (
        Array.isArray(this.ngControl.errors) && this.ngControl.errors.length > 0
      );
    }
  }
}
