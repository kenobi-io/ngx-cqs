import 'reflect-metadata';
import { QUERY_HANDLER_METADATA } from './constants';
import { IQuery } from '../interfaces/queries/query.interface';

export function QueryHandler(query: IQuery): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(QUERY_HANDLER_METADATA, query, target);
  };
};
