import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Title} from "@angular/platform-browser";

window.ga = window.ga || {};

/*
 Generated class for the AnalyticsService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AnalyticsService {

    protected googleAnalytics;

    constructor(protected titleService: Title) {
        console.log('Hello AnalyticsService Provider');

        if(window.hasOwnProperty('ga')) {
            this.googleAnalytics = window.ga;
            console.log(window.ga);
        }
    }

    sendTransactionGa(){
        this.googleAnalytics('ecommerce:addTransaction', {
            'id': '1234',                     // Transaction ID. Required.
            'affiliation': 'Delivery24Horas',   // Affiliation or store name.
            // 'revenue': '11.99',               // Grand Total.
            // 'shipping': '5',                  // Shipping.
            // 'tax': '1.29'                     // Tax.
            'currency': 'BRL'  // local currency code.
        });
    }

    sendOrderGa(){
        this.googleAnalytics('send', 'event', 'Enviar Pedido', 'submit');
        this.googleAnalytics('ecommerce:send');
    }

    sendPageviewGa(page='/home'){
        let params = {
            'hitType': 'pageview',
            'title': this.titleService.getTitle(),
            'page': page
        };
        this.googleAnalytics('send', params);

    }

    sendAddProductGa(itemFields){
        this.googleAnalytics('send', 'event', {
            'eventCategory': 'Products',
            'eventAction': 'AddItem'
        });
        this.googleAnalytics('ecommerce:addItem', {
            'id': '1234',                     // Transaction ID. Required.
            'sku': itemFields.product_id.toString(),
            'name': 'Android T-Shirt',
            'price': itemFields.valor_unitario.toString(),
            'quantity': itemFields.quantidade
        });

        this.googleAnalytics('ecommerce:send');
        // ga('ec:addProduct', {'id': 'P12345'});
        // ga('ec:addProduct', {'name': 'Android T-Shirt'});
        // ga('ec:addProduct', {'price': '29.20'});
        // ga('ec:addProduct', {'quantity': 2});
    }


}
