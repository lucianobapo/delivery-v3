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
import {AnalyticsService} from "../providers/analytics-service";
import {ConnectivityMonitorService} from "../providers/connectivity-monitor-service";
import {ServiceWorker} from "../providers/service-worker";
import {FacebookService} from "../providers/facebook-service";
import {GoogleService} from "../providers/google-service";

@Component({
    templateUrl: 'app.html',
    providers: [
        DataService,
        LogService,
        CepService,
        CartService,
        CategoriesService,
        ProductService,
        AnalyticsService,
        ConnectivityMonitorService,
        FacebookService,
        GoogleService,
        ServiceWorker
    ]
})
export class MyApp {
    rootPage = HomePage;

    constructor(platform: Platform,
                protected dataService: DataService,
                protected log: LogService,
                protected connectivityMonitorService: ConnectivityMonitorService) {

        dataService.simpleGet('build/main.css')
            .map(res => res.text())
            .subscribe(
                data => {
                    let firstElement = document.getElementsByTagName('script')[0];
                    let elToInsert = document.createElement('style');
                    elToInsert.innerHTML = data;
                    firstElement.parentNode.insertBefore(elToInsert, firstElement);
                },
                err => log.e(err)
            );

        platform.ready()
            .then(() => {
                connectivityMonitorService.startWatching();
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
