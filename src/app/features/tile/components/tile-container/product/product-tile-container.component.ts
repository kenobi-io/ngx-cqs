import {
  Component,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  Input,
  AfterViewInit
} from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ResolvingComponentService, ConditionService } from '../../../services/services';
import { ConditionResult } from '../../../services/condition/condition-result';
import { takeUntil, filter, map } from 'rxjs/operators';
import { componentStore } from '../../../tile';

@Component({
  selector: 'balloon-product-tile-container',
  templateUrl: './product-tile-container.component.html',
  styleUrls: ['./product-tile-container.component.scss']
})
export class ProductTileContainerComponent implements AfterViewInit, OnDestroy {

  private subscripton: Subject<void>;
  
  @ViewChild('container', { read: ViewContainerRef, static: true }) private container: ViewContainerRef;


  constructor(private readonly resolvingComponentService: ResolvingComponentService,
              private readonly conditionService: ConditionService) {
    this.subscripton = new Subject<void>();
  }

  public ngAfterViewInit() {

    this.container.clear();
    this.conditionService.conditionResult$.pipe(
      takeUntil(this.subscripton),
      filter((conditionResults) => conditionResults.every((conditionResult) => conditionResult.component === componentStore.productCardComponent)),
      map((conditionResults: ConditionResult[]) => {
        this.resolvingComponentService.resolving(conditionResults, this.container);
      })).subscribe();
  }

  public ngOnDestroy(): void {
    this.subscripton.next();
    this.subscripton.complete();
  }

}
