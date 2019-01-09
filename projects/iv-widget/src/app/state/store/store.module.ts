import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { stepsReducer } from './reducers/steps.reducer';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgrxStoreModule.forRoot({ steps: stepsReducer })]
})
export class StoreModule {}
