import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ivw-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss']
})
export class SummaryPageComponent implements OnInit {
  constructor(private store: Store<{}>) {}

  public steps$ = this.store.select('steps').pipe(
    map(steps => {
      return Object.keys(steps).map(key => steps[key]);
    })
  );

  ngOnInit() {}
}
