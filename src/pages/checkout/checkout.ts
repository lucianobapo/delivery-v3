import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CartService} from "../../providers/cart-service";
import {LogService} from "../../providers/log-service";

/*
 Generated class for the Checkout page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-checkout',
    templateUrl: 'checkout.html'
})
export class CheckoutPage implements OnInit {
    public id;
    public pagamento;
    public order_items;
    public address = {
        cep:'',
        logradouro:'',
        numero:'',
        bairro:'',
        obs:'',
    };

    constructor(protected navCtrl: NavController,
                protected cartService: CartService,
                protected navParams: NavParams,
                protected log: LogService) {
        this.fillOrder();
    }

    ionViewDidLoad() {
        this.log.l('ionViewDidLoad CheckoutPage');

    }

    ngOnInit() {
        this.fillOrder();
    }

    protected fillOrder(){
        let order = this.cartService.getOrderCreated();

        if(order != null){
            if (order.hasOwnProperty('id')) this.id = order.id;
            if (order.hasOwnProperty('shared_order_payment')) this.pagamento = order.shared_order_payment.descricao;
            if (order.hasOwnProperty('address')) this.address = order.address;
            if (order.hasOwnProperty('order_items')) this.order_items = order.order_items;
        }
    }

}
