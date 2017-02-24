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
import 'rxjs/add/operator/map';
import { DataService } from "./data-service";
import { LogService } from "./log-service";
/*
 Generated class for the CepService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var CepService = CepService_1 = (function () {
    function CepService(dataService, log) {
        this.dataService = dataService;
        this.log = log;
        log.l('Hello CepService Provider');
    }
    CepService.prototype.findByAddress = function (query) {
        var _this = this;
        return this.dataService
            .cepGet('RJ/Rio das Ostras/' + query)
            .map(function (response) {
            _this.data = CepService_1.mapDataToArray(response.json());
            _this.data.map(function (address) {
                address.cep = address.cep.replace('-', '');
            });
            _this.data.filter(function (address) {
                var searchIn = CepService_1.removeAcentos(address.logradouro);
                var queryToSearch = CepService_1.removeAcentos(query);
                if (searchIn.indexOf(queryToSearch) !== -1)
                    return true;
            });
            return _this.data;
        });
    };
    CepService.prototype.findByCep = function (query) {
        var _this = this;
        return this.dataService
            .cepGet(query)
            .map(function (response) {
            _this.data = CepService_1.mapDataToArray(response.json());
            _this.data.map(function (address) {
                address.cep = address.cep.replace('-', '');
            });
            return _this.data;
        });
    };
    CepService.prototype.handleError = function (error) {
        this.dataService.handleError(error);
    };
    CepService.prototype.dismiss = function () {
        this.dataService.dismiss();
    };
    CepService.prototype.showLoading = function () {
        this.dataService.showLoading();
    };
    CepService.removeAcentos = function (str) {
        str = str.toLowerCase();
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç";
        var to = "aaaaaeeeeeiiiiooooouuuunc";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        return str;
    };
    CepService.mapDataToArray = function (dataObject) {
        var dataArray = [];
        if (dataObject.constructor === Object && dataObject.hasOwnProperty('cep'))
            dataArray.push(dataObject);
        if (dataObject.constructor === Array && dataObject.length > 0)
            dataArray = dataObject;
        return dataArray;
    };
    return CepService;
}());
CepService = CepService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DataService,
        LogService])
], CepService);
export { CepService };
var CepService_1;
//# sourceMappingURL=cep-service.js.map