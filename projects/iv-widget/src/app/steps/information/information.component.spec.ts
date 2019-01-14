import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationComponent } from './information.component';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Spectator, createTestComponentFactory } from '@netbasal/spectator';

@Component({
  selector: 'ivw-input',
  template: '<p>ivw-input</p>'
})
class MockInputComponent {}

describe('InformationComponent', () => {
  let spectator: Spectator<InformationComponent>;
  const createComponent = createTestComponentFactory(InformationComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
