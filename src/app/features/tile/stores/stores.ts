import { Provider } from '@angular/core';
import { ComponentStoreProvider } from './component.store';
import { ConditionStoreProvider } from './condition.store';
import { ModelStoreProvider } from './model.store';

export * from './component.store';
export * from './condition.store';
export * from './model.store';

export const storeProviders: Provider[] = [ComponentStoreProvider, ConditionStoreProvider, ModelStoreProvider]