import 'reflect-metadata';
import { EVENTS_HANDLER_METADATA } from './constants';
import { IEvent } from '../interfaces/events/event.interface';

export const EventsHandler = (...events: IEvent[]): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(EVENTS_HANDLER_METADATA, events, target);
  };
};
