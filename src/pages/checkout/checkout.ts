import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {CartService} from "../../providers/cart-service";
import {LogService} from "../../providers/log-service";
import {AnalyticsService} from "../../providers/analytics-service";
import {ConnectivityMonitorService} from "../../providers/connectivity-monitor-service";

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
    public nome;
    public pagamento;
    public observacao;
    public order_items;
    public valor_total;
    public contacts;
    public address = {
        cep:'',
        logradouro:'',
        numero:'',
        bairro:'',
        complemento:'',
    };

    constructor(protected navCtrl: NavController,
                protected cartService: CartService,
                protected navParams: NavParams,
                protected analyticsService: AnalyticsService,
                protected viewCtrl: ViewController,
                protected log: LogService,
                protected connectivityMonitorService: ConnectivityMonitorService) {
        this.fillOrder();
    }

    ionViewWillEnter() {
        this.viewCtrl.showBackButton(false);
    }

    ionViewDidLoad() {
        this.log.l('ionViewDidLoad CheckoutPage');
        this.analyticsService.sendPageviewGa('/checkout');
    }

    ngOnInit() {
        this.fillOrder();
    }

    goToHome(){
        this.navCtrl.popToRoot();
    }

    protected fillOrder(){
        let order = this.cartService.getOrderCreated();

        if(order != null){
            if (order.hasOwnProperty('id')) this.id = order.id;
            if (order.hasOwnProperty('observacao')) this.observacao = order.observacao;
            if (order.hasOwnProperty('shared_order_payment')) this.pagamento = order.shared_order_payment.descricao;
            if (order.hasOwnProperty('address')) this.address = order.address;
            if (order.hasOwnProperty('partner')) {
                this.nome = order.partner.nome;
                if (order.partner.hasOwnProperty('contacts'))
                    this.contacts = order.partner.contacts;
            }
            if (order.hasOwnProperty('order_items')) {
                let soma = 0;
                order.order_items.map(item=>{
                    soma = soma + (item.quantidade*item.valor_unitario);
                });
                this.valor_total = soma;
                this.order_items = order.order_items;
            }
        }
    }

}
