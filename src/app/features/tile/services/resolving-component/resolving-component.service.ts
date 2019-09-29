import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ConditionService } from '../condition/condition.service';
import { ConditionResult } from '../condition/condition-result';

@Injectable({
  providedIn: 'root'
})
export class ResolvingComponentService {

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) { }

  public resolving(conditionResult: ConditionResult[], container: ViewContainerRef) {

    conditionResult.forEach(condition => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(condition.component);
      const componentRef = container.createComponent(componentFactory);
      if (componentRef) {
        (componentRef.instance as any).model = condition.model;
        (componentRef.instance as any).model.data = condition.data;
      }
    });
  }
}
