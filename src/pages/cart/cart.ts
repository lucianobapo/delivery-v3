///<reference path="../../providers/cart-service.ts"/>
import {Component} from '@angular/core';
import {CartService} from "../../providers/cart-service";
import {LogService} from "../../providers/log-service";
import {CepService} from "../../providers/cep-service";

/*
 Generated class for the Cart page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html'
})
export class CartPage{
    public foundAddresses;
    public foundCep;

    protected cepLoading = false;
    protected addressLoading = false;

    constructor(protected cartService: CartService,
                protected cepService: CepService,
                protected log: LogService) {
    }

    ionViewDidLoad() {
        this.log.l('ionViewDidLoad CartPage');
    }

    onKeyUpLogradouro($event){
        if($event.target.value.trim().length>3) {
            this.showAddressLoading();
            this.cepService.findByAddress($event.target.value).subscribe(
                data => {
                    this.foundAddresses = data;
                },
                err => this.cepService.handleError(err),
                () => this.hideAddressLoading());
        } else this.foundAddresses = [];

    }

    onKeyUpCep($event){
        let validCep = CartPage.validCep($event.target.value);
        if(validCep.length==8) {
            this.showCepLoading();
            this.cepService.findByCep(validCep).subscribe(
                data => {
                    this.foundCep = data;
                },
                err => this.cepService.handleError(err),
                () => this.hideCepLoading());
        } else this.foundCep = [];

    }

    onClickFoundAddress(item){
        this.foundAddresses = [];
        this.foundCep = [];
        this.cartService.setAddressValues(item);
    }

    private showAddressLoading() {
        this.addressLoading = true;
    }

    private hideAddressLoading() {
        this.addressLoading = false;
    }

    private showCepLoading() {
        this.cepLoading = true;
    }

    private hideCepLoading() {
        this.cepLoading = false;
    }

    private static validCep(value: any) {
        let filtered = value.trim();
        filtered = filtered.replace('-','');
        return filtered;
    }
}
