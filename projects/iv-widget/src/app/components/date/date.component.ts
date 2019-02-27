import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'ivw-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent {
  public disabled = false;

  @Input()
  label: string;

  private _value: Date | undefined;

  public dateForm: FormGroup;

  public isAllowed(event) {
    const maxChar = event.target.name === 'year' ? 4 : 2;
    const charCode = event.query ? event.query : event.keyCode;
    if (
      event.target.value.length >= maxChar ||
      (charCode > 31 && (charCode < 48 || charCode > 57))
    ) {
      return false;
    } else {
      return true;
    }
  }

  constructor(private ngControl: NgControl, private _fb: FormBuilder) {
    ngControl.valueAccessor = this;

    this.dateForm = this._fb.group(
      {
        day: ['', [Validators.required]],
        month: [
          '',
          [Validators.required, Validators.min(1), Validators.max(12)]
        ],
        year: ['', [Validators.required]]
      },
      {
        validator: c => {
          const { day, month, year } = c.value;
          const m = Number(month) - 1;
          const date = new Date(year, m, day);
          const valid =
            !isNaN(date.valueOf()) &&
            date.getDate() === Number(day) &&
            date.getMonth() === m &&
            date.getFullYear() === Number(year);
          return valid
            ? null
            : {
                validateDay: false
              };
        }
      }
    );

    this.dateForm.valueChanges.subscribe(({ day, month, year }) => {
      if (this.dateForm.valid) {
        this._value = new Date(year, month - 1, day);
        this.onChange(this._value);
        this.onTouched();
      }
    });
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  @Input('value')
  get value() {
    return this._value;
  }

  set value(val: Date | undefined) {
    if (val instanceof Date && !isNaN(val.valueOf())) {
      this.dateForm.patchValue({
        day: val.getDay(),
        month: val.getMonth(),
        year: val.getFullYear()
      });
    }
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
