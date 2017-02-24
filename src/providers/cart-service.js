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
import { LogService } from "./log-service";
import { ProductService } from './product-service';
import { DataService } from "./data-service";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
/*
 Generated class for the CartService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var CartService = CartService_1 = (function () {
    function CartService(productService, log, dataService, formBuilder) {
        this.productService = productService;
        this.log = log;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.mandante = 'ilhanet';
        this.log.l('Hello CartService Provider');
        this.nome = new FormControl('', Validators.required);
        this.pagamento = new FormControl('vistad', Validators.required);
        this.cep = new FormControl('', Validators.required);
        this.logradouro = new FormControl('', Validators.required);
        this.numero = new FormControl('');
        this.bairro = new FormControl('', Validators.required);
        this.items = new FormControl(this.getCartItems(), CartService_1.itemsValidator);
        this.contacts = this.formBuilder.group({
            emailCheck: [false],
            email: [''],
            smsCheck: [false],
            sms: [''],
            whatsappCheck: [false],
            whatsapp: [''],
        }, { validator: CartService_1.contactsValidator });
        this.order = formBuilder.group({
            mandante: [this.mandante],
            posted_at: [''],
            pagamento: this.pagamento,
            nome: this.nome,
            cep: this.cep,
            logradouro: this.logradouro,
            bairro: this.bairro,
            numero: this.numero,
            complemento: [''],
            observacao: [''],
            contacts: this.contacts,
            items: this.items
        });
    }
    CartService.prototype.add = function (productId) {
        var updatedItems = this.items.value;
        if (this.foundItem(productId))
            updatedItems[this.itemIndex(productId)].quantidade++;
        else
            updatedItems.push({
                mandante: this.mandante,
                cost_id: this.productService.getCostId(productId),
                product_id: productId,
                quantidade: 1,
                valor_unitario: this.productService.getValorVenda(productId)
            });
        this.items.setValue(updatedItems);
    };
    CartService.prototype.remove = function (productId) {
        if (this.foundItem(productId)) {
            var index = this.itemIndex(productId);
            var updatedItems = this.items.value;
            updatedItems[index].quantidade--;
            if (updatedItems[index].quantidade == 0)
                updatedItems.splice(index, 1);
            this.items.setValue(updatedItems);
            // this.cartContent.items[index].quantidade--;
            // if(this.cartContent.items[index].quantidade==0)
            //     this.cartContent.items.splice(index, 1);
        }
    };
    CartService.prototype.removeItem = function (itemToRemove) {
        if (this.foundItem(itemToRemove.product_id)) {
            // this.cartContent.items.splice(this.itemIndex(itemToRemove.product_id), 1);
            var updatedItems = this.items.value;
            updatedItems.splice(this.itemIndex(itemToRemove.product_id), 1);
            this.items.setValue(updatedItems);
        }
    };
    CartService.prototype.foundItem = function (productId) {
        return (this.itemIndex(productId) != -1);
    };
    CartService.prototype.itemIndex = function (productId) {
        return this.items.value.findIndex(function (item) {
            return item.product_id == productId;
        });
        // return this.cartContent.items.findIndex((item) => {
        //     return item.product_id == productId;
        // });
    };
    CartService.prototype.hasInCart = function (productId) {
        return this.foundItem(productId);
    };
    CartService.prototype.getCartQnty = function (productId) {
        if (this.foundItem(productId))
            return this.items.value[this.itemIndex(productId)].quantidade;
        // return this.cartContent.items[this.itemIndex(productId)].quantidade;
        return 0;
    };
    CartService.prototype.getCartItems = function () {
        if (this.items == undefined)
            return [];
        return this.items.value;
        // return this.cartContent.items;
    };
    CartService.prototype.hasCartValue = function () {
        return this.getTotalCart() > 0;
    };
    CartService.prototype.getTotalCart = function () {
        var soma = 0;
        if (this.items.value.constructor == Array && this.items.value.length > 0)
            this.items.value.forEach(function (item) { return soma = soma + (item.quantidade * item.valor_unitario); });
        // if (this.cartContent.items.length>0)
        //     this.cartContent.items.forEach(item => soma = soma + (item.quantidade * item.valor_unitario));
        return soma;
    };
    CartService.prototype.getNome = function (productId) {
        return this.productService.getNome(productId);
    };
    CartService.prototype.submitOrder = function () {
        var _this = this;
        this.order.controls['posted_at'].setValue(CartService_1.getFormattedDate());
        // this.log.d('enviando', this.order.value);
        return this.dataService.httpPost('delivery', this.order.value)
            .map(function (res) {
            _this.data = res.json().data;
            return _this.data;
        });
    };
    CartService.prototype.handleError = function (error) {
        this.dataService.handleError(error);
    };
    CartService.prototype.dismiss = function () {
        this.dataService.dismiss();
    };
    CartService.prototype.clearItems = function (orderCreated) {
        return this.dataService.httpGet('order/' + orderCreated.id)
            .map(function (res) { return res.json().data; });
    };
    CartService.prototype.setOrderCreated = function (order) {
        this.orderCreated = order;
    };
    CartService.prototype.getOrderCreated = function () {
        if (this.orderCreated)
            return this.orderCreated;
        return null;
    };
    CartService.getFormattedDate = function () {
        var date = new Date();
        var mm = date.getMonth() + 1;
        var dd = date.getDate();
        var dateFormatted = [date.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
        ].join('-');
        var hh = date.getHours();
        var ii = date.getMinutes();
        var ss = date.getSeconds();
        var timeFormatted = [
            (hh > 9 ? '' : '0') + hh,
            (ii > 9 ? '' : '0') + ii,
            (ss > 9 ? '' : '0') + ss
        ].join(':');
        return [dateFormatted, timeFormatted].join(' ');
    };
    CartService.contactsValidator = function (group) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var passouEmailCheck = (group.controls['emailCheck'].value && group.controls['email'].value != '' && emailPattern.test(group.controls['email'].value));
        var passouSmsCheck = (group.controls['smsCheck'].value && group.controls['sms'].value != '');
        var passouWhatsappCheck = (group.controls['whatsappCheck'].value && group.controls['whatsapp'].value != '');
        if (passouEmailCheck || passouSmsCheck || passouWhatsappCheck)
            return null;
        else {
            if (group.controls['emailCheck'].value && !passouEmailCheck)
                return { emailInvalid: true };
            if (group.controls['smsCheck'].value && !passouSmsCheck)
                return { smsInvalid: true };
            if (group.controls['whatsappCheck'].value && !passouWhatsappCheck)
                return { whatsappInvalid: true };
            return { contactsInvalid: true };
        }
    };
    CartService.itemsValidator = function (control) {
        if (control.value.constructor == Array && control.value.length > 0)
            return null;
        else
            return { required: true };
    };
    CartService.prototype.formBuild = function (field) {
        return this[field];
    };
    CartService.prototype.setAddressValues = function (item) {
        var _this = this;
        var propertyNames = Object.getOwnPropertyNames(item);
        propertyNames.map(function (propertyName) {
            if (propertyName != 'complemento' && _this.order.controls.hasOwnProperty(propertyName))
                _this.order.controls[propertyName].setValue(item[propertyName]);
        });
    };
    CartService.prototype.orderIsDirty = function () {
        return this.order.dirty;
    };
    CartService.prototype.contactsChecked = function (field) {
        return this.contacts.controls[field].value;
    };
    CartService.prototype.fieldIsInvalid = function (field) {
        return !this[field].valid;
    };
    CartService.prototype.fieldErr = function (field, error) {
        if (error === void 0) { error = 'required'; }
        return (this[field].errors !== null && this[field].errors.hasOwnProperty(error) && this[field].errors[error]);
    };
    return CartService;
}());
CartService = CartService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ProductService,
        LogService,
        DataService,
        FormBuilder])
], CartService);
export { CartService };
var CartService_1;
//# sourceMappingURL=cart-service.js.map