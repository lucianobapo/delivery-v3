import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";
import {LogService} from "./log-service";

/*
 Generated class for the ConnectivityMonitorService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ConnectivityMonitorService {
    protected online = true;

    constructor(protected platform: Platform,
                protected log: LogService) {
        log.l('Hello ConnectivityMonitorService Provider');
        // log.d(platform.platforms());
        // log.d(platform.navigatorPlatform());
    }

    isOnline() {
        // if (!this.platform.is('cordova') ) {
        //     this.online = (navigator.onLine && !this.online);
        // }
        return this.online;
    }

    isOffline() {
        // if (!this.platform.is('cordova')) {
        //     this.online = navigator.onLine;
        // }
        return !this.online;
    }

    startWatching(){
        if (!this.platform.is('cordova')){
            window.addEventListener("online", ()=>this.setOnline(), false);
            window.addEventListener("offline", ()=>this.setOffline(), false);
        }
    }

    setOnline() {
        if (!this.platform.is('cordova') && navigator.onLine) {
            this.log.l("went online");
            this.online = true;
        }
    }

    setOffline() {
        this.log.l("went offline");
        this.online = false;
    }
}
