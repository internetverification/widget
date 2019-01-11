import { Component, OnInit, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { oc } from 'ts-optchain';
import { Observable, Observer, concat } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'ivw-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  public disabled = false;

  constructor(private ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  @Input()
  label: string;

  private _value = null;

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

  fileChange(event) {
    this.value = event.target.value;
    const fileList = oc<{ target: { files: FileList } }>(event).target.files(
      new Array<File>() as any
    );
    const res = Array.from(fileList).map(f => this.getBase64$(f));
    concat(...res)
      .pipe(first())
      .subscribe(value => {
        this.value = value;
      });
  }

  private getBase64$(
    file: File
  ): Observable<{ name: string; content: string }> {
    return Observable.create(
      (observer: Observer<{ name: string; content: string }>) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let encoded = (reader.result as string).replace(
            /^data:(.*;base64,)?/,
            ''
          );
          if (encoded.length % 4 > 0) {
            encoded += '='.repeat(4 - (encoded.length % 4));
          }
          const name = file.name;
          const content = encoded;
          observer.next({ name, content });
        };
        reader.onerror = error => observer.error(error);
      }
    );
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
