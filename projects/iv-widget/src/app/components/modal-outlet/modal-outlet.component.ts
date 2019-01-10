import { Component, OnInit } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
import { ModalService } from '../../modal.service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ivw-modal-outlet',
  templateUrl: './modal-outlet.component.html',
  styleUrls: ['./modal-outlet.component.scss']
})
export class ModalOutletComponent implements OnInit {
  private _init$ = new ReplaySubject();
  private _portal$ = new BehaviorSubject(null);

  public readonly portal$ = this._init$.pipe(switchMap(() => this._portal$));

  get portal(): CdkPortal {
    return this._portal$.value;
  }

  set portal(value: CdkPortal) {
    this._portal$.next(value);
  }

  constructor(private modalService: ModalService) {
    this.modalService.registerOutlet(this);
  }

  ngOnInit() {
    this._init$.next();
  }
}
