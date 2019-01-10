import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetStepsBarComponent } from './widget-steps-bar.component';

describe('WidgetStepsBarComponent', () => {
  let component: WidgetStepsBarComponent;
  let fixture: ComponentFixture<WidgetStepsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetStepsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetStepsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
