import {Component, ViewChild, OnInit} from '@angular/core';

import {NavController, AlertController} from 'ionic-angular';

import {CategoriesService} from '../../providers/categories-service';
import {LogService} from "../../providers/log-service";

import {ProductPage} from "../product/product";
import {BasePage} from "../base-page";
import {CartService} from "../../providers/cart-service";
import {CartPage} from "../cart/cart";
import {AnalyticsService} from "../../providers/analytics-service";
import {ConnectivityMonitorService} from "../../providers/connectivity-monitor-service";
import {FacebookService} from "../../providers/facebook-service";
import {GoogleService} from "../../providers/google-service";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    entryComponents:[ ProductPage, CartPage ]
})
export class HomePage extends BasePage implements OnInit {
    @ViewChild('search') searchInput;
    protected categories;
    protected popoverOffline;

    constructor(protected navCtrl: NavController,
                protected log: LogService,
                protected categoriesService: CategoriesService,
                protected analyticsService: AnalyticsService,
                protected cartService: CartService,
                protected facebookService: FacebookService,
                protected googleService: GoogleService,
                protected connectivityMonitorService: ConnectivityMonitorService,
                protected alertCtrl: AlertController) {
        super();

    }

    ionViewDidLoad() {
        this.log.l('ionViewDidLoad HomePage');
        this.analyticsService.sendPageviewGa('/home');
    }

    ngOnInit() {
        this.categoriesService.findAll().subscribe(
            data => this.categories = data,
            err => this.categoriesService.handleError(err),
            () => this.categoriesService.dismiss());

    }

    goToProductPage(categoryId, categoryName, categoryIcon){
        this.navCtrl.push(ProductPage, {
            categoryId: categoryId,
            categoryName: categoryName,
            categoryIcon: categoryIcon
        });
    }

    goToCartPage(){
        this.navCtrl.push(CartPage);
    }

    presentPrompt() {
        let alert = this.alertCtrl.create({
            title: 'Login',
            subTitle: 'Delivery 24 Horas',
            message: 'Digite seu email e senha. Caso nao tenha senha você pode criar um usuário',
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Email',
                    type: 'email'
                },
                {
                    name: 'password',
                    placeholder: 'Senha',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Criar',
                    handler: data => {
                        if (false) {
                        // if (User.isValid(data.username, data.password)) {
                            // logged in!
                        } else {
                            // invalid login
                            return false;
                        }
                    }
                },
                {
                    text: 'Login',
                    handler: data => {
                        if (false) {
                        // if (User.isValid(data.username, data.password)) {
                            // logged in!
                        } else {
                            // invalid login
                            return false;
                        }
                    }
                }
            ]
        });
        alert.present();
    }

}
