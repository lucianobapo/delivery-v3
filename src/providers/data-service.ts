import {Injectable} from '@angular/core';
import {LoadingController} from 'ionic-angular';
import {Headers, RequestOptions, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {LogService} from "./log-service";
import {ConnectivityMonitorService} from "./connectivity-monitor-service";

/*
 Generated class for the DataService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DataService {

    protected showing = 0;
    protected loader;

    protected resourceUrl = 'https://erpnet-v5.ilhanet.com';
    // protected resourceUrl = 'https://erpnet-v5.localhost.com';

    constructor(protected http: Http,
                protected loadingController: LoadingController,
                protected connectivityMonitorService: ConnectivityMonitorService,
                protected log: LogService) {
        log.l('Hello DataService Provider');
        this.loader = this.loadingController.create({
            content: "Carregando..."
        });
    }

    httpPost(resource, body){
        let headers = new Headers();
        headers.append('Accept', 'application/x.erpnet.v1+json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers : headers});
        this.showLoading();
        this.connectivityMonitorService.setOnline();
        return this.http.post(this.resourceUrl+'/erpnet-api/'+resource, body, options);
    }

    httpGet(resource){
        let headers = new Headers();
        headers.append('Accept', 'application/x.erpnet.v1+json');
        let options = new RequestOptions({headers : headers});
        this.showLoading();
        this.connectivityMonitorService.setOnline();
        return this.http.get(this.resourceUrl+'/erpnet-api/'+resource, options);
    }

    cepGet(resource){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers : headers});
        // this.showLoading();
        this.connectivityMonitorService.setOnline();
        return this.http.get('https://viacep.com.br/ws/'+resource+'/json/', options);
    }

    simpleGet(resource){
        let headers = new Headers();
        // headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers : headers});
        // this.showLoading();
        this.connectivityMonitorService.setOnline();
        return this.http.get(resource, options);
    }

    handleError(error: Response | any) {
        this.log.d('handleError:', error);
        this.loader.dismissAll();
        this.loader = this.loadingController.create({
            content: "Carregando..."
        });
        // let err = error.json();
        // this.log.d('handleError:', error.json());
        // if (err.hasOwnProperty('currentTarget') && err.currentTarget.status == 0)
        this.connectivityMonitorService.setOffline();
        // this.log.d('connection:', this.connectivityMonitorService.isOnline());
        // if(Observable.hasOwnProperty('throw'))
        //     return Observable.throw(error.json().error || 'Server error');
        // else
        return error;
        // return Promise.reject('Ah, não!');
    }

    dismiss() {
        // this.loader.dismiss();
        this.showing--;
        if (this.showing==0) {
            this.loader.dismissAll();
            this.loader = this.loadingController.create({
                content: "Carregando..."
            });
        }
    }

    showLoading() {
        if (this.showing==0) this.loader.present();
        this.showing++;
    }

    isOffline() { return this.connectivityMonitorService.isOffline(); }
    isOnline() { return this.connectivityMonitorService.isOnline(); }
}
