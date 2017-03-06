///<reference path="../service-worker.d.ts"/>
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {ServiceWorkerContainer} from "../service-worker";
import {LogService} from "./log-service";

declare interface Navigator {
    serviceWorker: ServiceWorkerContainer;
}

/*
 Generated class for the ServiceWorker provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ServiceWorker {

    protected nv:Navigator;
    protected sw:ServiceWorkerContainer;

    constructor(protected log: LogService) {
        log.l('Hello ServiceWorker Provider');

        if(navigator.hasOwnProperty('serviceWorker')) {
            this.sw = this.nv.serviceWorker;
        }
    }

    disabled() {
        return !this.sw;
    }
}
