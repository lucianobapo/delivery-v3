var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
///<reference path="../../providers/cart-service.ts"/>
import { Component } from '@angular/core';
import { CartService } from "../../providers/cart-service";
import { LogService } from "../../providers/log-service";
import { CepService } from "../../providers/cep-service";
import { NavController } from "ionic-angular";
import { CheckoutPage } from "../checkout/checkout";
/*
 Generated class for the Cart page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var CartPage = CartPage_1 = (function () {
    function CartPage(navCtrl, cartService, cepService, log) {
        this.navCtrl = navCtrl;
        this.cartService = cartService;
        this.cepService = cepService;
        this.log = log;
        this.cepLoading = false;
        this.addressLoading = false;
    }
    CartPage.prototype.ionViewDidLoad = function () {
        this.log.l('ionViewDidLoad CartPage');
    };
    CartPage.prototype.onKeyUpLogradouro = function ($event) {
        var _this = this;
        if ($event.target.value.trim().length > 3) {
            this.showAddressLoading();
            this.cepService.findByAddress($event.target.value).subscribe(function (data) {
                _this.foundAddresses = data;
            }, function (err) { return _this.cepService.handleError(err); }, function () { return _this.hideAddressLoading(); });
        }
        else
            this.foundAddresses = [];
    };
    CartPage.prototype.onKeyUpCep = function ($event) {
        var _this = this;
        var validCep = CartPage_1.validCep($event.target.value);
        if (validCep.length == 8) {
            this.showCepLoading();
            this.cepService.findByCep(validCep).subscribe(function (data) {
                _this.foundCep = data;
            }, function (err) { return _this.cepService.handleError(err); }, function () { return _this.hideCepLoading(); });
        }
        else
            this.foundCep = [];
    };
    CartPage.prototype.onClickFoundAddress = function (item) {
        this.foundAddresses = [];
        this.foundCep = [];
        this.cartService.setAddressValues(item);
    };
    CartPage.prototype.submitOrder = function () {
        var _this = this;
        this.cartService.submitOrder()
            .subscribe(function (data) {
            // this.log.d('sucesso', data);
            _this.cartService.clearItems(data)
                .subscribe(function (data) {
                // this.log.d('orderCreated', data);
                _this.cartService.setOrderCreated(data);
                _this.navCtrl.push(CheckoutPage);
            }, function (err) { return _this.cartService.handleError(err); }, function () { return _this.cartService.dismiss(); });
        }, function (err) { return _this.cartService.handleError(err); }, function () { return _this.cartService.dismiss(); });
    };
    CartPage.prototype.showAddressLoading = function () {
        this.addressLoading = true;
    };
    CartPage.prototype.hideAddressLoading = function () {
        this.addressLoading = false;
    };
    CartPage.prototype.showCepLoading = function () {
        this.cepLoading = true;
    };
    CartPage.prototype.hideCepLoading = function () {
        this.cepLoading = false;
    };
    CartPage.validCep = function (value) {
        var filtered = value.trim();
        filtered = filtered.replace('-', '');
        return filtered;
    };
    return CartPage;
}());
CartPage = CartPage_1 = __decorate([
    Component({
        selector: 'page-cart',
        templateUrl: 'cart.html',
        entryComponents: [CheckoutPage]
    }),
    __metadata("design:paramtypes", [NavController,
        CartService,
        CepService,
        LogService])
], CartPage);
export { CartPage };
var CartPage_1;
//# sourceMappingURL=cart.js.map