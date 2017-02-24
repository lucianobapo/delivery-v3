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
import 'rxjs/add/operator/filter';
import { DataService } from "./data-service";
import { LogService } from "./log-service";
/*
 Generated class for the ProductService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var ProductService = (function () {
    function ProductService(dataService, log) {
        this.dataService = dataService;
        this.log = log;
        log.l('Hello ProductService Provider');
    }
    ProductService.prototype.findAll = function () {
        var _this = this;
        return this.dataService
            .httpGet('product?with=productProductGroups&orderBy=nome&search=4')
            .map(function (res) {
            _this.data = res.json().data;
            if (_this.data !== null && (typeof _this.data) == 'object')
                _this.data = _this.data.filter(function (item) {
                    if (item.hasOwnProperty('imagem')) {
                        return (item.imagem !== null);
                    }
                    else
                        _this.log.e("Error: item.hasOwnProperty('imagem')", item);
                    return true;
                });
            return _this.data;
        });
    };
    ProductService.prototype.findByCategory = function (categoryId) {
        var _this = this;
        return this.dataService
            .httpGet('product?with=productProductGroups&orderBy=nome&search=' + categoryId)
            .map(function (res) {
            _this.data = res.json().data;
            if (_this.data !== null && (typeof _this.data) == 'object')
                _this.data = _this.data.filter(function (item) {
                    if (item.hasOwnProperty('imagem')) {
                        return (item.imagem !== null);
                    }
                    else
                        _this.log.e("Error: item.hasOwnProperty('imagem')", item);
                    return true;
                });
            return _this.data;
        });
    };
    ProductService.prototype.handleError = function (error) {
        this.dataService.handleError(error);
    };
    ProductService.prototype.dismiss = function () {
        this.dataService.dismiss();
    };
    ProductService.prototype.getValorVenda = function (productId) {
        var valorUnitVenda = 0;
        this.data.forEach(function (item) {
            if (item.id == productId)
                valorUnitVenda = item.valorUnitVenda;
        });
        return valorUnitVenda;
    };
    ProductService.prototype.getNome = function (productId) {
        var nome = '';
        this.data.forEach(function (item) {
            if (item.id == productId)
                nome = item.nome;
        });
        return nome;
    };
    ProductService.prototype.getCostId = function (productId) {
        var costId = null;
        this.data.forEach(function (item) {
            if (item.id == productId)
                costId = item.cost_id;
        });
        return costId;
    };
    return ProductService;
}());
ProductService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DataService,
        LogService])
], ProductService);
export { ProductService };
//# sourceMappingURL=product-service.js.map