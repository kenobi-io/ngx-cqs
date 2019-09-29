import { Injectable } from '@angular/core';
import { ConditionStoreProvider } from '../../stores/stores';
import { ConditionResult } from './condition-result';
import { from, Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { QueryBus } from '../../../../../../projects/ngx-cqrs/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  private subject: Subject<ConditionResult[]>

  constructor(private readonly queryBus: QueryBus) {
    this.subject = new Subject<ConditionResult[]>();
  }

  get conditionResult$() {
    return this.subject.asObservable();
  }

  public executeConditionQuery(condition: (param) => ConditionResult[], param): void {
    from(this.queryBus.execute(param.query)).subscribe((dto) => {
      const result: ConditionResult[] = condition({ data: dto, option: param.option });
      this.subject.next(result);
    });
  }
}
