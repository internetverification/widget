import { ThemeDirective } from "./theme.directive";

describe("ThemeDirective", () => {
  it("should create an instance", () => {
    const directive = new ThemeDirective(null, null, null);
    expect(directive).toBeTruthy();
  });
});
