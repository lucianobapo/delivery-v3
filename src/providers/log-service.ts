import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";

/*
 Generated class for the LogService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */

let log = false;
let debug = true;
let error = true;

@Injectable()
export class LogService {

    constructor(protected platform: Platform) {
        this.l('Hello LogService Provider');
    }

    l(...args) {
        if (log)
            [].slice.apply(args).forEach(function (value) {
                console.log(value);
            });
    }

    d(...args) {
        if (debug)
            [].slice.apply(args).forEach(value=>{
                if (this.platform.is('cordova'))
                    console.error(value);
                else
                    console.debug(value);
            });
    }

    e(...args) {
        if (error)
            [].slice.apply(args).forEach(function (value) {
                console.error(value);
            });
    }
}
