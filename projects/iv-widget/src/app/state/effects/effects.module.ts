import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule as NgrxEffectsModule } from '@ngrx/effects';
import { StepsEffects } from './steps.effects';
import { DataModule } from '../../data/data.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DataModule, NgrxEffectsModule.forRoot([StepsEffects])]
})
export class EffectsModule {}
