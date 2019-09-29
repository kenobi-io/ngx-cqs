import 'reflect-metadata';
import { COMMAND_HANDLER_METADATA } from './constants';
import { ICommand } from '../interfaces/commands/command.interface';

export function CommandHandler(command: ICommand): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(COMMAND_HANDLER_METADATA, command, target);
  };
};
