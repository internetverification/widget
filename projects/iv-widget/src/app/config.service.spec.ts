import { TestBed } from "@angular/core/testing";

import { ConfigService } from "./config.service";
import { TranslateModule } from "@ngx-translate/core";

describe("ConfigService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()]
    })
  );

  it("should be created", () => {
    const service: ConfigService = TestBed.get(ConfigService);
    expect(service).toBeTruthy();
  });

  it("should emit config when addConfig", done => {
    const service: ConfigService = TestBed.get(ConfigService);
    const config: any = {};

    service.config$.subscribe(result => {
      expect<any>(result).toBe(config);
      done();
    });

    service.addConfig(config);
  });
});
