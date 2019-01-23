import { Injectable } from '@angular/core';
import { timer, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';

interface StepDocument {
  step: string;
  type: 'jpeg/base64';
  data: string;
}

interface StepInformation {
  first_name: string;
  last_name: string;
  email: string;
  age: string;
  address: {
    city: string;
    address: string;
    street_number: string;
    state: string;
    country: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StepDataService {
  constructor(private httpClient: HttpClient, private config: ConfigService) {}

  private get apiEndpoint() {
    return `${this.config.config.apiUrl}/${this.config.config.tenantId}/${
      this.config.config.serviceId
    }/submissions/${this.config.config.submissionId}`;
  }

  submitStep(type: string, payload: any) {
    switch (type) {
      case 'picture':
        const { image } = payload;
        return this.submitDocument({
          data: image.replace('data:image/jpeg;base64,', ''),
          type: 'jpeg/base64',
          step: '1'
        });
      case 'file':
        const { file } = payload;
        return this.submitDocument({
          data: file,
          type: 'jpeg/base64',
          step: '1'
        });
      case 'information':
        return this.submitInformation(payload);
      default:
        return throwError(new Error('Step type not supported'));
    }
  }

  submitDocument(document: StepDocument) {
    return this.httpClient.post(`${this.apiEndpoint}/documents`, document);
  }

  submitInformation(information: StepInformation) {
    return this.httpClient.post(`${this.apiEndpoint}/information`, information);
  }
}
