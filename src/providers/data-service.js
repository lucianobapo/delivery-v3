var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { LogService } from "./log-service";
/*
 Generated class for the DataService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var DataService = (function () {
    function DataService(http, loadingController, log) {
        this.http = http;
        this.loadingController = loadingController;
        this.log = log;
        this.showing = 0;
        this.resourceUrl = 'https://erpnet-v5.ilhanet.com';
        log.l('Hello DataService Provider');
        this.loader = this.loadingController.create({
            content: "Carregando..."
        });
    }
    DataService.prototype.httpPost = function (resource, body) {
        var headers = new Headers();
        headers.append('Accept', 'application/x.erpnet.v1+json');
        headers.append('Content-Type', 'application/json');
        var options = new RequestOptions({ headers: headers });
        this.showLoading();
        return this.http.post(this.resourceUrl + '/erpnet-api/' + resource, body, options);
    };
    DataService.prototype.httpGet = function (resource) {
        var headers = new Headers();
        headers.append('Accept', 'application/x.erpnet.v1+json');
        var options = new RequestOptions({ headers: headers });
        this.showLoading();
        return this.http.get(this.resourceUrl + '/erpnet-api/' + resource, options);
    };
    DataService.prototype.cepGet = function (resource) {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        var options = new RequestOptions({ headers: headers });
        // this.showLoading();
        return this.http.get('https://viacep.com.br/ws/' + resource + '/json/', options);
    };
    DataService.prototype.simpleGet = function (resource) {
        var headers = new Headers();
        // headers.append('Accept', 'application/json');
        var options = new RequestOptions({ headers: headers });
        // this.showLoading();
        return this.http.get(resource, options);
    };
    DataService.prototype.handleError = function (error) {
        this.loader.dismissAll();
        this.loader = this.loadingController.create({
            content: "Carregando..."
        });
        this.log.e(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    DataService.prototype.dismiss = function () {
        // this.loader.dismiss();
        this.showing--;
        if (this.showing == 0) {
            this.loader.dismissAll();
            this.loader = this.loadingController.create({
                content: "Carregando..."
            });
        }
    };
    DataService.prototype.showLoading = function () {
        if (this.showing == 0)
            this.loader.present();
        this.showing++;
    };
    return DataService;
}());
DataService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        LoadingController,
        LogService])
], DataService);
export { DataService };
//# sourceMappingURL=data-service.js.map