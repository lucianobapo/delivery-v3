import {Injectable} from '@angular/core';
import {LoadingController} from 'ionic-angular';
import {Headers, RequestOptions, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {LogService} from "./log-service";

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

    constructor(public http: Http,
                public loadingController: LoadingController,
                private log: LogService) {
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
        return this.http.post(this.resourceUrl+'/erpnet-api/'+resource, body, options);
    }

    httpGet(resource){
        let headers = new Headers();
        headers.append('Accept', 'application/x.erpnet.v1+json');
        let options = new RequestOptions({headers : headers});
        this.showLoading();
        return this.http.get(this.resourceUrl+'/erpnet-api/'+resource, options);
    }

    cepGet(resource){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers : headers});
        // this.showLoading();
        return this.http.get('https://viacep.com.br/ws/'+resource+'/json/', options);
    }

    simpleGet(resource){
        let headers = new Headers();
        // headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers : headers});
        // this.showLoading();
        return this.http.get(resource, options);
    }

    handleError(error) {
        this.loader.dismissAll();
        this.loader = this.loadingController.create({
            content: "Carregando..."
        });
        this.log.e(error);
        return Observable.throw(error.json().error || 'Server error');
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
}
