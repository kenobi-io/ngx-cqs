import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy, Input } from '@angular/core';
import { Subscription, from, Subject } from 'rxjs';
import { ResolvingComponentService, ConditionStoreProvider, ConditionService, ConditionResult } from '../../../tile';
import { map, filter, takeUntil } from 'rxjs/operators';
import { componentStore } from '../../../stores/stores';

@Component({
  selector: 'balloon-category-tile-container',
  templateUrl: './category-tile-container.component.html',
  styleUrls: ['./category-tile-container.component.scss']
})
export class CategoryTileContainerComponent implements OnInit, OnDestroy {

  private subscripton: Subject<void>;

  @ViewChild('container', { read: ViewContainerRef, static: true }) private container: ViewContainerRef;


  constructor(private readonly resolvingComponentService: ResolvingComponentService,
              private readonly conditionService: ConditionService) {
    this.subscripton = new Subject<void>();
  }

  public ngOnInit() { }


  public ngAfterViewInit() {

    this.container.clear();
    this.conditionService.conditionResult$.pipe(
      takeUntil(this.subscripton),
      filter((conditionResults) => conditionResults.every((conditionResult) => conditionResult.component === componentStore.categoryCardComponent)),
      map((conditionResults: ConditionResult[]) => {
        this.resolvingComponentService.resolving(conditionResults, this.container);
      })).subscribe();
  }

  public ngOnDestroy(): void {
    this.subscripton.next();
    this.subscripton.complete();
  }
}
