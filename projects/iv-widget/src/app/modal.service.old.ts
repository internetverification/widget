import {
  Injectable,
  TemplateRef,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  Type,
  Inject,
  ViewContainerRef
} from '@angular/core';
import { ModalOutletComponent } from './components/modal-outlet/modal-outlet.component';
import { TemplatePortal } from '@angular/cdk/portal';
import { componentFactoryName } from '@angular/compiler';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { isDefined } from './rxjs.utils';
import { take, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _outlet$ = new BehaviorSubject<ModalOutletComponent>(null);

  private get _outlet() {
    return this._outlet$.value;
  }

  private set _outlet(value: ModalOutletComponent) {
    this._outlet$.next(value);
  }

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

      // 2. Attach component to the appRef so that it's inside the ng component tree
      this.appRef.attachView(componentRef.hostView);

      // 3. Get DOM element from component
      const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      // 4. Append DOM element to the body
      window.document.body.appendChild(domElem);
    }
  }

  attach(template: TemplateRef<any>, _vcr: ViewContainerRef) {
    this._outlet$
      .pipe(
        isDefined,
        take(1)
      )
      .subscribe(() => {
        setTimeout(() => {
          this._outlet.portal = new TemplatePortal(template, null);
        });
      });
    // if (this._outlet) {
    // }
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
