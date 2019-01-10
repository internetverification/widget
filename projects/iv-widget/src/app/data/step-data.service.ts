import { Injectable } from '@angular/core';
import { of, empty, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepDataService {
  constructor() {}

  submitStep(payload: any) {
    console.log(payload);
    return timer(Math.random() * 10 * 1000);
  }
}
