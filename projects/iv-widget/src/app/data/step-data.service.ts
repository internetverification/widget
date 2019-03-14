import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ConfigService } from '../config.service';
import { oc } from 'ts-optchain';

interface StepDocument {
  step: string;
  type: 'image/jpeg' | 'application/pdf';
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

const DOUBLE_SLASH = /([^:]\/)\/+/g;

@Injectable({
  providedIn: 'root'
})
export class StepDataService {
  constructor(private httpClient: HttpClient, private config: ConfigService) {}

  private get apiEndpoint() {
    const subId = oc(this.config).config.submissionId();
    try {
      if (typeof URL !== 'undefined') {
        return new URL(
          `${this.config.config.apiUrl}/submissions/${subId}`.replace(
            DOUBLE_SLASH,
            '$1'
          )
        );
      }
    } catch (ex) {
      console.warn('Your apiUrl is invalid');
      return `/submissions/${subId}`;
    }

    return `${oc(this.config).config.apiUrl() || ''}/submissions/${subId}`;
  }

  submitStep(stepName: string, type: string, payload: any) {
    switch (type) {
      case 'picture':
        const { image } = payload;
        return this.submitDocument({
          data: image.replace('data:image/jpeg;base64,', ''),
          type: 'image/jpeg',
          step: stepName
        });
      case 'file':
        const { file } = payload;
        return this.submitDocument({
          data: file.content,
          type: file.type,
          step: stepName
        });
      case 'information':
        return this.submitInformation(payload);
      default:
        return throwError(new Error('Step type not supported'));
    }
  }

  private getHeaders(): HttpHeaders {
    const header = new HttpHeaders();
    return header.append(
      'Authorization',
      `Bearer ${oc(this.config).config.jwt()}`
    );
  }
  submitDocument(document: StepDocument) {
    return this.httpClient.post(`${this.apiEndpoint}/documents`, document, {
      headers: this.getHeaders()
    });
  }

  submitInformation(information: StepInformation) {
    return this.httpClient.post(
      `${this.apiEndpoint}/information`,
      information,
      {
        headers: this.getHeaders()
      }
    );
  }
}
