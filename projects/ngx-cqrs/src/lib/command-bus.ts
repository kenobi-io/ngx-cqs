import { Type, Injectable, Injector } from '@angular/core';
import 'reflect-metadata';
import { COMMAND_HANDLER_METADATA } from './decorators/constants';
import { CommandHandlerNotFoundException } from './exceptions/command-not-found.exception';
import { ObservableBus } from './utils/observable-bus';
import { InvalidCommandHandlerException } from './exceptions/invalid-command-handler.exception';
import { ICommand } from './interfaces/commands/command.interface';
import { ICommandBus } from './interfaces/commands/command-bus.interface';
import { ICommandHandler } from './interfaces/commands/command-handler.interface';

export type CommandHandlerType = Type<ICommandHandler<ICommand>>;

@Injectable()
export class CommandBus extends ObservableBus<ICommand> implements ICommandBus {
  private handlers = new Map<string, ICommandHandler<ICommand>>();

  constructor(private readonly moduleRef: Injector) {
    super();
  }

  execute<T extends ICommand>(command: T): Promise<any> {
    const handler = this.handlers.get(this.getCommandName(command));
    if (!handler) {
      throw new CommandHandlerNotFoundException();
    }
    this.subject$.next(command);
    return handler.execute(command);
  }

  bind<T extends ICommand>(handler: ICommandHandler<T>, name: string) {
    this.handlers.set(name, handler);
  }

  register(handlers: CommandHandlerType[] = []) {
    handlers.forEach(handler => this.registerHandler(handler));
  }

  protected registerHandler(handler: CommandHandlerType) {
    const instance = this.moduleRef.get(handler, { strict: false });
    if (!instance) {
      return;
    }
    const target = this.reflectCommandName(handler);
    if (!target) {
      throw new InvalidCommandHandlerException();
    }
    this.bind(instance as ICommandHandler<ICommand>, target.name);
  }

  private getCommandName(command): string {
    const { constructor } = Object.getPrototypeOf(command);
    return constructor.name as string;
  }

  private reflectCommandName(handler: CommandHandlerType): FunctionConstructor {
    return Reflect.getOwnMetadata(COMMAND_HANDLER_METADATA, handler);
  }
}
