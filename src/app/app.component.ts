import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {HomePage} from '../pages/home/home';

import {DataService} from '../providers/data-service';
import {LogService} from '../providers/log-service';
import {CartService} from '../providers/cart-service';
import {ProductService} from "../providers/product-service";
import {CategoriesService} from "../providers/categories-service";
import {CepService} from "../providers/cep-service";

@Component({
    templateUrl: 'app.html',
    providers: [DataService, LogService, CepService, CartService, CategoriesService, ProductService]
})
export class MyApp {
    rootPage = HomePage;

    constructor(platform: Platform, log: LogService) {
        platform.ready()
            .then(() => {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                if (platform.is('cordova')){
                    StatusBar.styleDefault();
                    Splashscreen.hide();
                }
            })
            .catch((error) => {
                log.e('Promise error:', error);
            });
    }
}
