import { Component, Input, OnInit } from '@angular/core';
import { IvWidgetConfig } from './types';
import { ConfigService } from './config.service';

@Component({
  selector: 'ivw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input()
  config: IvWidgetConfig = {
    idToken: '',
    steps: [{ type: 'information' }, { type: 'picture' }],
    lang: {
      en: {
        ENTER_YOUR_INFORMATION: 'Enter your information',
        INVALID_STEP_TYPE: 'Invalid step type',
        NEXT: 'Next'
      },
      fr: {
        ENTER_YOUR_INFORMATION: 'Entrez vos informations',
        INVALID_STEP_TYPE: `Ce type détape n'est pas supporté`,
        NEXT: 'Suivant'
      }
    }
  };

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.configService.addConfig(this.config);
  }
}
