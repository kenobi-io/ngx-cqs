import { Injectable, Inject, PLATFORM_ID, ComponentFactoryResolver } from '@angular/core';

@Injectable()
export class PlatformService {

    // tslint:disable-next-line: ban-types
    constructor(@Inject(PLATFORM_ID) public readonly platform: Object,
                public componentFactoryResolver: ComponentFactoryResolver) { }
}