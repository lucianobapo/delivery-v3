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
 Generated class for the CategoriesService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var CategoriesService = (function () {
    function CategoriesService(dataService, log) {
        this.dataService = dataService;
        this.log = log;
        log.l('Hello CategoriesService Provider');
    }
    CategoriesService.prototype.findAll = function () {
        var _this = this;
        return this.dataService
            .httpGet('product_group')
            .map(function (res) {
            _this.data = res.json().data;
            if (_this.data !== null && (typeof _this.data) == 'object')
                _this.data.forEach(function (item) {
                    //filtra o nome da categoria
                    if (item.hasOwnProperty('grupo')) {
                        var start = item.grupo.indexOf("Categoria: ") + 11;
                        item.grupo = item.grupo.substr(start, item.grupo.length);
                    }
                    else
                        _this.log.e("Error: item.hasOwnProperty('grupo')");
                    //filtra o nome do icone
                    if (item.hasOwnProperty('icone')) {
                        if (item.icone.indexOf('icon ion-') !== -1)
                            item.icone = item.icone.substr(9, item.icone.length);
                        if (item.icone.indexOf('icon fa fa-') !== -1)
                            item.icone = item.icone.substr(11, item.icone.length);
                    }
                    else
                        _this.log.e("Error: item.hasOwnProperty('icone')");
                });
            return _this.data;
        });
    };
    CategoriesService.prototype.handleError = function (error) {
        this.dataService.handleError(error);
    };
    CategoriesService.prototype.dismiss = function () {
        this.dataService.dismiss();
    };
    return CategoriesService;
}());
CategoriesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DataService,
        LogService])
], CategoriesService);
export { CategoriesService };
//# sourceMappingURL=categories-service.js.map