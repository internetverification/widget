import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StepComponent } from "./step.component";
import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "ivw-picture",
  template: "<p>ivw-picture</p>"
})
class MockPictureComponent {}

@Component({
  selector: "ivw-information",
  template: "<p>ivw-picture</p>"
})
class MockInformationComponent {}

describe("StepComponent", () => {
  let component: StepComponent;
  let fixture: ComponentFixture<StepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StepComponent,
        MockPictureComponent,
        MockInformationComponent
      ],
      imports: [TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
