import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { Component, Input } from "@angular/core";
import { StepComponent } from "./steps/step/step.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "ivw-step",
  template: "<p>ivw-step</p>"
})
class MockStepComponent {
  @Input()
  step;
}

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MockStepComponent],
      imports: [TranslateModule.forRoot()]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
