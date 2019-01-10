import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgOverlayComponent } from './svg-overlay.component';

describe('SvgOverlayComponent', () => {
  let component: SvgOverlayComponent;
  let fixture: ComponentFixture<SvgOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
