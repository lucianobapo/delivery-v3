import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {LogService} from "./log-service";
import {ConnectivityMonitorService} from "./connectivity-monitor-service";

window.ga = window.ga || {};

/*
 Generated class for the AnalyticsService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AnalyticsService {

    protected googleAnalytics;
    protected transactionId = Date.now();

    constructor(protected log: LogService,
                protected connectivityMonitorService: ConnectivityMonitorService) {
        this.log.l('Hello AnalyticsService Provider');

        if(window.hasOwnProperty('ga')) {
            this.googleAnalytics = window.ga;
            // console.log(window.ga);
        }
    }

    sendTransactionGa(){
        if (this.connectivityMonitorService.isOffline()) return;
        this.renewTransactionId();
        this.googleAnalytics('ecommerce:addTransaction', {
            'id': this.transactionId,                     // Transaction ID. Required.
            'affiliation': 'Delivery24Horas',   // Affiliation or store name.
            // 'revenue': '11.99',               // Grand Total.
            // 'shipping': '5',                  // Shipping.
            // 'tax': '1.29'                     // Tax.
            'currency': 'BRL'  // local currency code.
        });
    }

    sendOrderGa(){
        if (this.connectivityMonitorService.isOffline()) return;
        this.googleAnalytics('send', 'event', 'Order', 'Submit');
        this.googleAnalytics('ecommerce:send');
    }

    sendPageviewGa(page='/home'){
        if (this.connectivityMonitorService.isOffline()) return;
        this.googleAnalytics('send', 'event', {
            'eventCategory': 'Pages',
            'eventAction': 'PageEnter',
            'eventLabel': page
        });
        // let params = {
        //     'hitType': 'pageview',
        //     'title': this.titleService.getTitle(),
        //     'page': page
        // };
        // this.googleAnalytics('send', params);

    }

    sendAddProductGa(itemFields){
        if (this.connectivityMonitorService.isOffline()) return;
        this.googleAnalytics('send', 'event', {
            'eventCategory': 'Products',
            'eventAction': 'AddItem'
        });
        this.googleAnalytics('ecommerce:addItem', {
            'id': this.transactionId,                     // Transaction ID. Required.
            'sku': itemFields.product_id.toString(),
            'name': itemFields.nome,
            'price': itemFields.valor_unitario.toString(),
            'quantity': itemFields.quantidade
        });

        // this.googleAnalytics('ecommerce:send');
        // ga('ec:addProduct', {'id': 'P12345'});
        // ga('ec:addProduct', {'name': 'Android T-Shirt'});
        // ga('ec:addProduct', {'price': '29.20'});
        // ga('ec:addProduct', {'quantity': 2});
    }


    private renewTransactionId() {
        this.transactionId = Date.now();
    }

    sendLoginGa(provider: string) {
        if (this.connectivityMonitorService.isOffline()) return;
        this.googleAnalytics('send', 'event', {
            'eventCategory': 'Pages',
            'eventAction': 'Login',
            'eventLabel': provider
        });
    }
}
