import {
  Injectable,
  TemplateRef,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  Type,
  Inject
} from '@angular/core';
import { ModalOutletComponent } from './components/modal-outlet/modal-outlet.component';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _outlet: ModalOutletComponent;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT)
    private document: Document
  ) {}

  init<T>(outlet: Type<T>) {
    if (!this._outlet) {
      const componentRef = this.componentFactoryResolver
        .resolveComponentFactory(outlet)
        .create(this.injector);

      setTimeout(() => {
        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);
        // 3. Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the body
        window.document.body.appendChild(domElem);
      });
    }
  }

  attach(template: TemplateRef<any>) {
    if (this._outlet) {
      setTimeout(() => {
        this._outlet.portal = new TemplatePortal(template, null);
      });
    }
  }

  detach() {
    if (this._outlet) {
      setTimeout(() => {
        this._outlet.portal.detach();
        this._outlet.portal = null;
      });
    }
  }

  registerOutlet(outlet: ModalOutletComponent) {
    this._outlet = outlet;
  }
}
