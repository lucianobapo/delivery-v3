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
/*
 Generated class for the LogService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var log = false;
var debug = true;
var error = true;
var LogService = (function () {
    function LogService() {
        this.l('Hello LogService Provider');
    }
    LogService.prototype.l = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (log)
            [].slice.apply(args).forEach(function (value) {
                console.log(value);
            });
    };
    LogService.prototype.d = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (debug)
            [].slice.apply(args).forEach(function (value) {
                console.debug(value);
            });
    };
    LogService.prototype.e = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (error)
            [].slice.apply(args).forEach(function (value) {
                console.error(value);
            });
    };
    return LogService;
}());
LogService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], LogService);
export { LogService };
//# sourceMappingURL=log-service.js.map