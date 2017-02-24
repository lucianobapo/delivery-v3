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
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/share';
/*
 Generated class for the LoadingService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var LoadingService = (function () {
    function LoadingService() {
        var _this = this;
        console.log('Hello LoadingService Provider');
        this.loading$ = new Observable(function (observer) { return _this._observer = observer; }).share();
    }
    LoadingService.prototype.toggleLoadingIndicator = function (name) {
        if (this._observer) {
            this._observer.next(name);
        }
    };
    return LoadingService;
}());
LoadingService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], LoadingService);
export { LoadingService };
//# sourceMappingURL=loading-service.js.map