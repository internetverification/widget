import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepDataService {
  constructor() {}

  submitStep(payload: any) {
    console.log(payload);
    return of();
  }
}
