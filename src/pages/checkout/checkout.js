var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CartService } from "../../providers/cart-service";
import { LogService } from "../../providers/log-service";
/*
 Generated class for the Checkout page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var CheckoutPage = (function () {
    function CheckoutPage(navCtrl, cartService, navParams, log) {
        this.navCtrl = navCtrl;
        this.cartService = cartService;
        this.navParams = navParams;
        this.log = log;
        this.address = {
            cep: '',
            logradouro: '',
            numero: '',
            bairro: '',
            obs: '',
        };
        this.fillOrder();
    }
    CheckoutPage.prototype.ionViewDidLoad = function () {
        this.log.l('ionViewDidLoad CheckoutPage');
    };
    CheckoutPage.prototype.ngOnInit = function () {
        this.fillOrder();
    };
    CheckoutPage.prototype.fillOrder = function () {
        var order = this.cartService.getOrderCreated();
        if (order != null) {
            if (order.hasOwnProperty('id'))
                this.id = order.id;
            if (order.hasOwnProperty('shared_order_payment'))
                this.pagamento = order.shared_order_payment.descricao;
            if (order.hasOwnProperty('address'))
                this.address = order.address;
            if (order.hasOwnProperty('order_items'))
                this.order_items = order.order_items;
        }
    };
    return CheckoutPage;
}());
CheckoutPage = __decorate([
    Component({
        selector: 'page-checkout',
        templateUrl: 'checkout.html'
    }),
    __metadata("design:paramtypes", [NavController,
        CartService,
        NavParams,
        LogService])
], CheckoutPage);
export { CheckoutPage };
//# sourceMappingURL=checkout.js.map